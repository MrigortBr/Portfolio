import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ButtonShadow,
  HelloContainer,
  ImageWrapper,
  TextWrapper,
} from "./style";
import Image from "next/image";
import { useIsMobile } from "@/hooks/isMobile";
import Sit from "@/assets/undrawCell.svg";
const hello = [
  "Hello World",
  "Hola Mundo",
  "Olá Mundo",
  "Привет мир",
  "Bonjour le monde",
  "Ciao mondo",
  "Olá Mundo",
];

function HelloComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [helloWorld, setHelloWorld] = useState("Olá Mundo");
  const isMobile = useIsMobile();
  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setHelloWorld((prev) => {
        index = (index + 1) % hello.length;
        return hello[index];
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <HelloContainer ref={ref} className='page'>
      <TextWrapper>
        <h1>{helloWorld}</h1>
        <h1 className='upper'>
          Eu sou um <br />
          programador
        </h1>
        <h1 className='lower'>Seja bem vindo ao meu portfólio</h1>
        <ButtonShadow onClick={() => props.setPageIndex(1)}>
          Saiba mais sobre mim
        </ButtonShadow>
      </TextWrapper>

      <ImageWrapper>
        {" "}
        {isMobile ? (
          <Sit className='w-40 h-40'></Sit>
        ) : (
          <Image
            src={"programmer.svg"}
            width={20}
            height={20}
            alt='Programmer image'
            loading='eager'
          />
        )}
      </ImageWrapper>
    </HelloContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(HelloComponent);
