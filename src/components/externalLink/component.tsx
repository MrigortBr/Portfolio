"use client";

import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiX } from "react-icons/fi";
import { Button } from "../ui/buttons";
import {
  alwaysOpen,
  isExternal,
  OPEN_EXTERNAL_EVENT,
  openNow,
  setAlwaysOpen,
} from "./openExternal";
import { Actions, Backdrop, CloseButton, Dialog, Url } from "./style";

/**
 * Intercepta qualquer clique em link que sai do portfólio e pede confirmação.
 * "Sempre abrir" grava a escolha e o aviso não aparece mais.
 */
export default function ExternalLinkGuard() {
  const [pending, setPending] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // cliques em <a href> externos (em qualquer seção)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.href;
      if (!isExternal(href) || alwaysOpen()) return;
      e.preventDefault();
      setPending(href);
    };

    // aberturas feitas pelo código (openExternal)
    const onRequest = (e: Event) =>
      setPending((e as CustomEvent<string>).detail);

    document.addEventListener("click", onClick, true);
    window.addEventListener(OPEN_EXTERNAL_EVENT, onRequest);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(OPEN_EXTERNAL_EVENT, onRequest);
    };
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setPending(null);
      setClosing(false);
    }, 180);
  };

  useEffect(() => {
    if (!pending) return;
    openButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending]);

  const confirm = (always: boolean) => {
    if (!pending) return;
    if (always) setAlwaysOpen();
    openNow(pending);
    close();
  };

  if (!pending) return null;

  let label = pending;
  try {
    const url = new URL(pending);
    label =
      url.protocol === "mailto:" || url.protocol === "tel:"
        ? pending.replace(/^(mailto|tel):/, "").split("?")[0]
        : url.host + (url.pathname === "/" ? "" : url.pathname);
  } catch {
    // mantém o texto original
  }

  return (
    <Backdrop
      $closing={closing}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <Dialog
        role='dialog'
        aria-modal='true'
        aria-labelledby='external-title'
        $closing={closing}
      >
        <CloseButton onClick={close} aria-label='Cancelar'>
          <FiX />
        </CloseButton>
        <span className='icon'>
          <FiExternalLink />
        </span>
        <h2 id='external-title'>Sair do portfólio?</h2>
        <p>Este link abre um endereço fora do portfólio:</p>
        <Url title={pending}>{label}</Url>
        <Actions>
          <Button $variant='ghost' onClick={close}>
            Cancelar
          </Button>
          <Button $variant='ghost' onClick={() => confirm(true)}>
            Sempre abrir
          </Button>
          <Button ref={openButtonRef} onClick={() => confirm(false)}>
            Abrir link
          </Button>
        </Actions>
        <small>
          &quot;Sempre abrir&quot; lembra a escolha neste navegador e o aviso
          não aparece mais.
        </small>
      </Dialog>
    </Backdrop>
  );
}
