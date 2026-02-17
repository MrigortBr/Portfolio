import { Dispatch, forwardRef, SetStateAction } from "react";
import {
  ContactItens,
  FigureContainer,
  TextWrapper,
  ThankYouConatiner,
} from "./style";
import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import User from "@/assets/undrawdemo.svg";

export function ThankYouComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <ThankYouConatiner ref={ref} className='page'>
      <TextWrapper>
        <h1>Obrigado!</h1>
        <h1 className='upper'>Caso queria entrar em contato</h1>
      </TextWrapper>
      <ContactItens>
        <span style={{ animationDelay: "300ms" }}>
          <IoLogoLinkedin
            onClick={() =>
              openLink(
                "https://www.linkedin.com/in/igor-pereira-lins-01a1691a1/"
              )
            }
          />
        </span>
        <span style={{ animationDelay: "200ms" }}>
          <MdEmail onClick={() => openLink("mailto:igorperecom@gmail.com")} />
        </span>
        <span style={{ animationDelay: "500ms" }}>
          <IoLogoWhatsapp
            onClick={() =>
              openLink(
                "https://wa.me/5581997938091?text=Ol%C3%A1%20Igor%2C%20gostaria%20de%20falar%20com%20voc%C3%AA%20sobre..."
              )
            }
          />
        </span>
      </ContactItens>
      <FigureContainer>
        <User className='w-40 h-40' />
      </FigureContainer>
    </ThankYouConatiner>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ThankYouComponent);
