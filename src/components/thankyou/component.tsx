import {
  CSSProperties,
  Dispatch,
  forwardRef,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { IconType } from "react-icons";
import { FiArrowUp, FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useInView } from "@/hooks/useInView";
import User from "@/assets/undrawdemo.svg";
import { SECTION } from "@/data/sections";
import { Button, LinkButton } from "../ui/buttons";
import {
  Actions,
  Blob,
  Card,
  Cards,
  CopyButton,
  Eyebrow,
  Figure,
  Subtitle,
  ThankYouContainer,
  Title,
} from "./style";

type Contact = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  /** cor da marca; sem cor = usa a cor do texto do tema */
  color?: string;
  /** texto copiado pelo botão de copiar (opcional) */
  copy?: string;
};

const EMAIL = "igorperecom@gmail.com";

const contacts: Contact[] = [
  {
    label: "LinkedIn",
    value: "in/igor-pereira-lins",
    href: "https://www.linkedin.com/in/igor-pereira-lins-01a1691a1/",
    icon: IoLogoLinkedin,
    color: "#0A66C2",
  },
  {
    label: "E-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: MdEmail,
    color: "#EA4335",
    copy: EMAIL,
  },
  {
    label: "WhatsApp",
    value: "+55 81 99793-8091",
    href: "https://wa.me/5581997938091?text=Ol%C3%A1%20Igor%2C%20gostaria%20de%20falar%20com%20voc%C3%AA%20sobre...",
    icon: IoLogoWhatsapp,
    color: "#25D366",
  },
  {
    label: "GitHub",
    value: "MrigortBr",
    href: "https://github.com/MrigortBr",
    icon: FaGithub,
  },
];

const TITLE = "Obrigado!";

export function ThankYouComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const visible = useInView(cardsRef);
  const [copied, setCopied] = useState(false);

  const copy = async (e: MouseEvent, text: string) => {
    // não abre o link do card ao clicar em copiar
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // navegador sem permissão de área de transferência: segue o link
      window.open(`mailto:${text}`, "_self");
    }
  };

  return (
    <ThankYouContainer
      ref={ref}
      className='page'
      data-visible={visible ? "true" : "false"}
    >
      <Blob className='a' aria-hidden />
      <Blob className='b' aria-hidden />

      <Eyebrow>{"// fim do arquivo"}</Eyebrow>
      <Title aria-label={TITLE}>
        {TITLE.split("").map((ch, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} aria-hidden>
            {ch}
          </span>
        ))}
      </Title>
      <Subtitle>
        Gostou do que viu? Vamos conversar, escolha o canal que preferir.
      </Subtitle>

      <Cards ref={cardsRef}>
        {contacts.map((c, i) => (
          <Card
            key={c.label}
            href={c.href}
            target='_blank'
            rel='noopener noreferrer'
            style={
              {
                "--i": i,
                "--brand": c.color ?? "currentColor",
              } as CSSProperties
            }
          >
            <span className='icon'>
              <c.icon />
            </span>
            <span className='text'>
              <strong>{c.label}</strong>
              <small>{c.value}</small>
            </span>
            {c.copy && (
              <CopyButton
                type='button'
                onClick={(e) => copy(e, c.copy!)}
                aria-label={copied ? "Copiado" : `Copiar ${c.label}`}
                title={copied ? "Copiado!" : "Copiar"}
                $copied={copied}
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </CopyButton>
            )}
          </Card>
        ))}
      </Cards>

      <Actions>
        <LinkButton
          href='/Curriculo Igor Pereira Lins-2025.pdf'
          download='Curriculo Igor Pereira Lins.pdf'
        >
          <FiDownload /> Baixar currículo
        </LinkButton>
        <Button
          $variant='ghost'
          onClick={() => props.setPageIndex(SECTION.hello)}
        >
          <FiArrowUp /> Voltar ao início
        </Button>
      </Actions>

      {/* o boneco entra por último, apontando para os contatos */}
      <Figure aria-hidden>
        <User />
      </Figure>
    </ThankYouContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ThankYouComponent);
