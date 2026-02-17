/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  CloseButton,
  GalleryContainer,
  GalleryContent,
  ImagesWrapper,
  ImgContainer,
} from "./style";

type GalleryComponentProps = {
  images: string[];
  onClose?: () => void;
  init: string;
};

export default function GalleryComponent({
  images,
  onClose,
  init, // nome do arquivo inicial
}: GalleryComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const target = wrapper.children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
      setCurrentIndex(index);
    }
  };

  const next = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    scrollToIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIndex);
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    if (!init) return;

    console.log(images);

    const initIndex = images.findIndex((img) => img.includes(`${init}`));

    console.log(initIndex);

    if (initIndex >= 0) {
      scrollToIndex(initIndex);
    }
  }, [init, images]);

  return (
    <GalleryContainer $isOpen={isOpen}>
      <header>
        <p>{images[currentIndex]?.split("/").pop()}</p>
        {onClose && <CloseButton onClick={close}>X</CloseButton>}
      </header>

      <GalleryContent>
        <button onClick={prev}>{"<"}</button>

        <ImagesWrapper ref={wrapperRef}>
          {images.map((src, i) => (
            <ImgContainer key={i}>
              <Image
                src={`/projects/${src}`}
                alt={`Slide ${i}`}
                width={1920}
                height={1080}
                className='rounded-lg'
                loading='eager'
              />
            </ImgContainer>
          ))}
        </ImagesWrapper>

        <button onClick={next}>{">"}</button>
      </GalleryContent>
    </GalleryContainer>
  );
}
