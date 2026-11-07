import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import Sit from "@/assets/undrawCell.svg";
import Programmer from "@/assets/programmer.svg";
import { useInView } from "@/hooks/useInView";
import { SECTION } from "@/data/sections";
import { Button } from "../ui/buttons";
import { skillGroups } from "../stacks/data";
import {
  Actions,
  Bio,
  BackgroundCode,
  Blob,
  Caret,
  Code,
  Figure,
  Greeting,
  HelloContainer,
  Intro,
  Name,
  Role,
  StackIcons,
} from "./style";

const greetings = [
  "Olá, Mundo",
  "Hello, World",
  "Hola, Mundo",
  "Bonjour, le monde",
  "Ciao, mondo",
  "Hallo, Welt",
  "Привет, мир",
];

/** Saudação que digita e apaga, alternando entre os idiomas */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === word) delay = 1600; // pausa com a palavra completa
    if (deleting && text === "") delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1)
        );
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return text;
}

/* ---------- Código "digitado" no editor ---------- */

type Token = [
  kind: "kw" | "var" | "prop" | "str" | "punc" | "com" | "bool",
  text: string,
];

const code: Token[][] = [
  [["com", "// igor.ts"]],
  [
    ["kw", "const "],
    ["var", "igor"],
    ["punc", " = {"],
  ],
  [
    ["prop", "  cargo"],
    ["punc", ": "],
    ["str", '"Full Stack & Analista de Dados"'],
    ["punc", ","],
  ],
  [
    ["prop", "  local"],
    ["punc", ": "],
    ["str", '"Gravatá - PE"'],
    ["punc", ","],
  ],
  [
    ["prop", "  stack"],
    ["punc", ": ["],
    ["str", '"TypeScript"'],
    ["punc", ", "],
    ["str", '"Next.js"'],
    ["punc", ", "],
    ["str", '"NestJS"'],
    ["punc", "],"],
  ],
  [
    ["prop", "  dados"],
    ["punc", ": ["],
    ["str", '"PostgreSQL"'],
    ["punc", ", "],
    ["str", '"Power BI"'],
    ["punc", "],"],
  ],
  [
    ["prop", "  missao"],
    ["punc", ": "],
    ["str", '"transformar dados em decisões"'],
    ["punc", ","],
  ],
  [
    ["prop", "  cafe"],
    ["punc", ": "],
    ["bool", "true"],
    ["punc", ","],
  ],
  [["punc", "};"]],
];

const TOTAL_CHARS = code.flat().reduce((n, [, t]) => n + t.length, 0);
const CHARS_PER_TICK = 1;
const TICK_MS = 28;

function TypedCode({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= TOTAL_CHARS) {
          clearInterval(id);
          return c;
        }
        return c + CHARS_PER_TICK;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [active]);

  // quanto de cada linha já foi "digitado" e em qual linha fica o cursor
  const lines: { tokens: Token[]; caret: boolean }[] = [];
  let remaining = count;
  let caretPlaced = false;
  for (let l = 0; l < code.length; l++) {
    const tokens: Token[] = [];
    for (const [kind, text] of code[l]) {
      const shown = text.slice(0, Math.max(0, remaining));
      remaining -= text.length;
      if (shown) tokens.push([kind, shown]);
    }
    const caret = !caretPlaced && (remaining < 0 || l === code.length - 1);
    if (caret) caretPlaced = true;
    lines.push({ tokens, caret });
  }

  return (
    <Code>
      {lines.map(({ tokens, caret }, l) => (
        <div key={l} className='line'>
          <span className='ln'>{l + 1}</span>
          <span>
            {tokens.map(([kind, text], t) => (
              <span key={t} className={kind}>
                {text}
              </span>
            ))}
            {caret && <Caret />}
          </span>
        </div>
      ))}
    </Code>
  );
}

function HelloComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const introRef = useRef<HTMLDivElement>(null);
  const visible = useInView(introRef);
  const greeting = useTypewriter(greetings);
  const coreStack = skillGroups[0].items;

  return (
    <HelloContainer
      ref={ref}
      className='page'
      data-visible={visible ? "true" : "false"}
    >
      <Blob className='a' aria-hidden />
      <Blob className='b' aria-hidden />

      {/* código "desenhado" no fundo, sendo digitado devagar */}
      <BackgroundCode aria-hidden>
        {/* key: remonta ao voltar para a seção e digita de novo */}
        <TypedCode key={visible ? "on" : "off"} active={visible} />
      </BackgroundCode>

      <Intro ref={introRef}>
        <Greeting aria-label='Olá, Mundo'>
          <span className='slash'>{"//"}</span> {greeting}
          <Caret />
        </Greeting>
        <Name>Igor Pereira Lins</Name>
        <Role>Desenvolvedor Full Stack & Analista de Dados</Role>
        <Bio>
          Construo aplicações web de ponta a ponta, do banco de dados à
          interface, e transformo dados em informação útil para quem decide.
        </Bio>

        <Actions>
          <Button onClick={() => props.setPageIndex(SECTION.about)}>
            <FiUser /> Saiba mais sobre mim
          </Button>
          <Button
            $variant='ghost'
            onClick={() => props.setPageIndex(SECTION.projects)}
          >
            Ver projetos <FiArrowRight />
          </Button>
        </Actions>

        <StackIcons aria-label='Stack principal'>
          {coreStack.map((tech, i) => (
            <li
              key={tech.name}
              title={tech.name}
              style={{ "--i": i } as CSSProperties}
            >
              <tech.icon style={{ color: tech.color }} />
            </li>
          ))}
        </StackIcons>
      </Intro>

      <Figure aria-hidden>
        {/* desktop: programador na mesa · celular: boneco animado */}
        <Programmer className='desk' />
        <Sit className='phone' />
      </Figure>
    </HelloContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(HelloComponent);
