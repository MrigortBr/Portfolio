import { Dispatch, forwardRef, SetStateAction } from "react";
import Image from "next/image";
import {
  AboutContainer,
  AboutTextWrapper,
  AboutTitle,
  ExperienceWrapper,
  ImageWrapper,
  ItemSkill,
  Skills,
  SkillsTitle,
} from "./style";

const hello = [
  "Hello World",
  "Hola Mundo",
  "Olá Mundo",
  "Привет мир",
  "Bonjour le monde",
  "Ciao mondo",
  "Olá Mundo",
];

const langs = [
  {
    name: "Node.js",
    image: "/lang/node.svg",
  },
  {
    name: "Typescript",
    image: "/lang/typescript.svg",
  },
  {
    name: "Javascript",
    image: "/lang/js.svg",
  },
  {
    name: "Lua",
    image: "/lang/lua.svg",
  },

  {
    name: "Python",
    image: "/lang/python.svg",
  },
  {
    name: "php",
    image: "/lang/php.svg",
  },
  {
    name: "Java",
    image: "/lang/java.svg",
  },
  {
    name: "Next.js",
    image: "/lang/nextjs.svg",
  },
  {
    name: "Vue.js",
    image: "/lang/vue.js.svg",
  },
  {
    name: "code igniter",
    image: "/lang/codeigniter.svg",
  },
  {
    name: "react",
    image: "/lang/react.svg",
  },
  {
    name: "OracleSQL",
    image: "/lang/OracleSQL.svg",
  },
  {
    name: "MySql",
    image: "/lang/MySql.svg",
  },
  {
    name: "MongoDB",
    image: "/lang/mogodb.svg",
  },
  {
    name: "Postgresql",
    image: "/lang/Postgresql.svg",
  },
  {
    name: "Power BI",
    image: "/lang/Power bi.svg",
  },
  {
    name: "Amazon Web Service",
    image: "/lang/aws.svg",
  },
  {
    name: "Docker",
    image: "/lang/docker.svg",
  },
  {
    name: "Figma",
    image: "/lang/figma.svg",
  },
];

const best = [
  {
    name: "Node.js",
    image: "/lang/node.svg",
    margintop: "-2%",
    borderr: "40% 60% 70% 30% / 40% 50% 60% 50%",
  },
  {
    name: "Typescript",
    image: "/lang/typescript.svg",
    margintop: "0%",
    borderr: "40% 50% 70% 30% / 40% 40% 60% 50%",
  },
  {
    name: "Next.js",
    image: "/lang/nextjs.svg",
    margintop: "2%",
    borderr: "40% 60% 50% 30% / 40% 50% 40% 50%",
  },
  {
    name: "Power BI",
    image: "/lang/Power bi.svg",
    margintop: "0%",
    borderr: "40% 60% 70% 50% / 40% 50% 60% 70%",
  },
  {
    name: "Postgresql",
    image: "/lang/Postgresql.svg",
    margintop: "-2%",
    borderr: "40% 80% 70% 50% / 40% 70% 60% 70%",
  },
];

export function AboutMeComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <AboutContainer className='page' ref={ref}>
      <AboutTitle>Sobre Mim</AboutTitle>
      <AboutTextWrapper>
        <p>
          Sou um desenvolvedor full-stack apaixonado por tecnologia e inovação.
          Formado em Desenvolvimento de Sistemas (2020) e em Sistemas de
          Informação (2025), atualmente atuo como pesquisador em um projeto
          governamental em parceria com o Instituto Fiocruz. Além disso,
          desenvolvo projetos como freelancer, aplicando minhas habilidades para
          criar soluções práticas e eficientes. Estou em busca de oportunidades
          onde possa contribuir, aprender e compartilhar conhecimento, sempre
          com foco em resultados de qualidade.
        </p>
        <ImageWrapper>
          <Image
            src='/eu.jpg'
            alt='My picture'
            width={3120}
            height={4208}
            quality={100}
            style={{ width: "100%", height: "100%" }}
          />
        </ImageWrapper>
      </AboutTextWrapper>
      <ExperienceWrapper>
        <ul>
          <li>
            <p className='value'>2+</p>
            <p>Anos de Experiencia</p>
          </li>
          <li>
            <p className='value'>30+</p>
            <p>Projetos Publicados</p>
          </li>
          <li>
            <p className='value'>10+</p>
            <p>Certificados</p>
          </li>
        </ul>
      </ExperienceWrapper>
      <Skills>
        <SkillsTitle>Top 5 Stacks</SkillsTitle>
        {best.map((b, i) => {
          return (
            <ItemSkill
              key={i}
              style={{ marginTop: b.margintop, borderRadius: b.borderr }}
            >
              <div>
                <Image
                  src={b.image}
                  width={32}
                  height={32}
                  alt={`${b.name} logo`}
                />
              </div>
              <p>{b.name}</p>
            </ItemSkill>
          );
        })}
      </Skills>
    </AboutContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(AboutMeComponent);
