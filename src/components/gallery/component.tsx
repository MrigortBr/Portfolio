"use client";

import {
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import {
  Counter,
  Frame,
  Hint,
  IconButton,
  NavArrow,
  Overlay,
  Thumb,
  Thumbs,
  TopActions,
  TopBar,
  Viewer,
  ZoomLayer,
} from "./style";

type GalleryComponentProps = {
  /** nomes dos arquivos dentro de /public/projects */
  images: string[];
  /** arquivo que abre primeiro */
  init: string;
  /** nome do projeto, exibido no topo */
  title?: string;
  onClose?: () => void;
};

/** Duração da animação de saída (ms) — igual à do style */
const CLOSE_MS = 250;
/** Arraste mínimo no celular para trocar de imagem (px) */
const SWIPE_THRESHOLD = 50;
/** Nível de zoom ao clicar na imagem */
const ZOOM = 2.2;

const pad = (n: number) => String(n).padStart(2, "0");

export default function GalleryComponent({
  images,
  init,
  title,
  onClose,
}: GalleryComponentProps) {
  const total = images.length;
  const [index, setIndex] = useState(() => Math.max(0, images.indexOf(init)));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [zoomed, setZoomed] = useState(false);
  const [closing, setClosing] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Foca a galeria ao abrir para o teclado (Esc, ←, →) funcionar na hora
  useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  // Mantém a miniatura ativa visível na faixa de baixo
  useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  const goTo = (target: number, dir: 1 | -1) => {
    if (total < 2) return;
    setDirection(dir);
    setZoomed(false);
    setIndex((target + total) % total);
  };
  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  const close = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose?.(), CLOSE_MS);
  };

  const setOrigin = (e: MouseEvent<HTMLDivElement>) => {
    const layer = zoomRef.current;
    if (!layer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    layer.style.transformOrigin = `${x}% ${y}%`;
  };

  const toggleZoom = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOrigin(e);
    setZoomed((z) => !z);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || zoomed) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) next();
    else prev();
  };

  // Clique no fundo (fora da imagem e dos controles) fecha
  const closeOnBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return createPortal(
    <Overlay
      ref={overlayRef}
      tabIndex={-1}
      role='dialog'
      aria-modal='true'
      aria-label={`Galeria${title ? ` — ${title}` : ""}`}
      $closing={closing}
      onKeyDown={handleKeyDown}
      // impede que a roda do mouse troque a seção do portfólio por trás
      onWheel={(e) => e.stopPropagation()}
      onClick={closeOnBackdrop}
    >
      <TopBar>
        <Counter>
          {title && <strong>{title}</strong>}
          <span>
            {pad(index + 1)} / {pad(total)}
          </span>
        </Counter>
        <TopActions>
          <IconButton
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? "Diminuir zoom" : "Aumentar zoom"}
            title={zoomed ? "Diminuir zoom" : "Aumentar zoom"}
          >
            {zoomed ? <FiZoomOut /> : <FiZoomIn />}
          </IconButton>
          <IconButton onClick={close} aria-label='Fechar' title='Fechar (Esc)'>
            <FiX />
          </IconButton>
        </TopActions>
      </TopBar>

      <Viewer
        onClick={closeOnBackdrop}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {total > 1 && (
          <NavArrow
            className='prev'
            onClick={prev}
            aria-label='Imagem anterior'
          >
            <FiChevronLeft />
          </NavArrow>
        )}

        {/* key reinicia a animação de entrada a cada troca */}
        <Frame
          key={index}
          $direction={direction}
          $zoomed={zoomed}
          onClick={toggleZoom}
          onMouseMove={zoomed ? setOrigin : undefined}
        >
          <ZoomLayer
            ref={zoomRef}
            style={{ transform: zoomed ? `scale(${ZOOM})` : "scale(1)" }}
          >
            <Image
              src={`/projects/${images[index]}`}
              alt={`${title ?? "Projeto"} — tela ${index + 1} de ${total}`}
              fill
              sizes='92vw'
              quality={90}
              priority
              draggable={false}
            />
          </ZoomLayer>
        </Frame>

        {total > 1 && (
          <NavArrow className='next' onClick={next} aria-label='Próxima imagem'>
            <FiChevronRight />
          </NavArrow>
        )}
      </Viewer>

      {total > 1 && (
        <Thumbs ref={thumbsRef}>
          {images.map((src, i) => (
            <Thumb
              key={src}
              $active={i === index}
              aria-label={`Ver tela ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            >
              <Image src={`/projects/${src}`} alt='' fill sizes='140px' />
            </Thumb>
          ))}
        </Thumbs>
      )}

      <Hint>
        <kbd>Esc</kbd> fechar · <kbd>←</kbd> <kbd>→</kbd> navegar · clique na
        imagem para dar zoom
      </Hint>
    </Overlay>,
    document.body
  );
}
