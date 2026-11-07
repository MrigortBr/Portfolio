import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
} from "react";
import Image from "next/image";
import {
  LuArrowUpRight,
  LuAward,
  LuBriefcase,
  LuFolderGit2,
  LuGraduationCap,
  LuLayers,
  LuMapPin,
} from "react-icons/lu";
import { IconType } from "react-icons";
import { useInView } from "@/hooks/useInView";
import { useFitToHeight } from "@/hooks/useFitToHeight";
import { SECTION } from "@/data/sections";
import CountUp from "../countUp/component";
import { ProjectsHeader, ProjectsTitle } from "../projects/style";
import { projects } from "../projects/component";
import { totalTechs } from "../stacks/data";
import { certificates } from "../certificates/data";
import { yearsOfExperience } from "../Experience/data";
import {
  AboutContainer,
  Bio,
  Body,
  Content,
  Education,
  LangList,
  Location,
  Photo,
  Profile,
  SectionLabel,
  Stat,
  Stats,
} from "./style";

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  icon: IconType;
  accent: string;
  section: number;
};

const stats: StatItem[] = [
  {
    value: yearsOfExperience,
    suffix: "+",
    label: "anos de experiência",
    icon: LuBriefcase,
    accent: "#34D399",
    section: SECTION.experience,
  },
  {
    value: projects.length,
    label: "projetos",
    icon: LuFolderGit2,
    accent: "#8B7CFF",
    section: SECTION.projects,
  },
  {
    value: totalTechs,
    label: "tecnologias",
    icon: LuLayers,
    accent: "#38BDF8",
    section: SECTION.skills,
  },
  {
    value: certificates.length,
    label: "certificados",
    icon: LuAward,
    accent: "#FB923C",
    section: SECTION.certificates,
  },
];

type EducationItem = {
  title: string;
  place: string;
  period: string;
  logo?: string;
  current?: boolean;
};

const education: EducationItem[] = [
  {
    title: "Computer Technology / Computer Systems Technology",
    place: "Em curso",
    period: "Atual",
    current: true,
  },
  {
    title: "Bacharelado em Sistemas de Informação",
    place: "Unifacol",
    period: "2021 – 2025",
    logo: "/unifacolLogo.svg",
  },
  {
    title: "Técnico em Desenvolvimento de Sistemas",
    place: "ETE José Joaquim da Silva Filho",
    period: "2018 – 2020",
    logo: "/ete.png",
  },
];

const languages = [
  { name: "Português", level: "Nativo", value: 100 },
  { name: "Inglês", level: "B2", value: 70 },
  { name: "Espanhol", level: "B2", value: 70 },
];

export function AboutMeComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const visible = useInView(bodyRef);
  // textos, cards e espaçamentos crescem até a seção preencher a altura
  useFitToHeight(bodyRef, 400);

  return (
    <AboutContainer
      className='page'
      ref={ref}
      data-visible={visible ? "true" : "false"}
    >
      <ProjectsHeader>
        <ProjectsTitle>Sobre mim</ProjectsTitle>
      </ProjectsHeader>

      <Body ref={bodyRef}>
        <Profile>
          <Photo>
            <span className='ring' aria-hidden />
            <div className='frame'>
              <Image
                src='/eu.jpg'
                alt='Foto de Igor Pereira Lins'
                fill
                sizes='(max-width: 768px) 60vw, 280px'
                quality={90}
              />
            </div>
          </Photo>
          <h3>Igor Pereira Lins</h3>
          <p>Desenvolvedor Full Stack & Analista de Dados</p>
          <Location>
            <LuMapPin /> Gravatá, Pernambuco
          </Location>

          <SectionLabel>Idiomas</SectionLabel>
          <LangList>
            {languages.map((l, i) => (
              <li
                key={l.name}
                style={{ "--i": i, "--value": `${l.value}%` } as CSSProperties}
              >
                <span>
                  {l.name} <em>{l.level}</em>
                </span>
                <i aria-hidden>
                  <b />
                </i>
              </li>
            ))}
          </LangList>
        </Profile>

        <Content>
          <Bio>
            <p>
              Sou desenvolvedor full stack apaixonado por tecnologia e por
              resolver problemas reais com código. Comecei cedo, com o{" "}
              <strong>Técnico em Desenvolvimento de Sistemas</strong> (2020), e
              me formei em <strong>Sistemas de Informação</strong> (2025),
              sempre estudando por conta própria tudo o que encontrava pelo
              caminho.
            </p>
            <p>
              Hoje atuo como desenvolvedor e analista de dados no{" "}
              <strong>Ministério da Saúde</strong>, criando sistemas e
              transformando dados de saúde pública em informação para a gestão.
              Em paralelo, participo de projetos de pesquisa: sou programador
              full stack no <strong>SD-UFPE</strong> e lidero a parte técnica do{" "}
              <strong>Censo de Odontologia Brasil</strong>, coordenando as
              equipes de front-end e back-end.
            </p>
            <p>
              Também gosto de criar projetos próprios e em equipe, como o{" "}
              <strong>Hell on Tap</strong>, um FPS multiplayer no navegador.
              Curto aprender, compartilhar conhecimento e entregar soluções
              práticas, bem construídas e com foco em qualidade.
            </p>
          </Bio>

          <Stats>
            {stats.map((s, i) => (
              <Stat
                key={s.label}
                onClick={() => props.setPageIndex(s.section)}
                style={{ "--i": i, "--accent": s.accent } as CSSProperties}
                title={`Ir para ${s.label}`}
              >
                <span className='icon'>
                  <s.icon />
                </span>
                <strong>
                  <CountUp to={s.value} active={visible} />
                  {s.suffix}
                </strong>
                <span className='label'>{s.label}</span>
                <LuArrowUpRight className='go' />
              </Stat>
            ))}
          </Stats>

          <div>
            <SectionLabel>Formação</SectionLabel>
            <Education>
              {education.map((e, i) => (
                <li key={e.title} style={{ "--i": i } as CSSProperties}>
                  <span className='logo'>
                    {e.logo ? (
                      <Image src={e.logo} alt='' width={28} height={28} />
                    ) : (
                      <LuGraduationCap />
                    )}
                  </span>
                  <div>
                    <strong>{e.title}</strong>
                    <small>{e.place}</small>
                  </div>
                  <span className={e.current ? "period current" : "period"}>
                    {e.period}
                  </span>
                </li>
              ))}
            </Education>
          </div>
        </Content>
      </Body>
    </AboutContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(AboutMeComponent);
