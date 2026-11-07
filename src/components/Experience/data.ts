import { IconType } from "react-icons";
import { LuFolderGit2, LuHeartPulse } from "react-icons/lu";
import { TbDental } from "react-icons/tb";

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  /** selo opcional exibido no card (ex.: "Pesquisa") */
  kind?: "Pesquisa";
  /** início no cargo (mês 1–12) */
  start: { month: number; year: number };
  /** fim no cargo; ausente = em andamento (selo "Atual") */
  end?: { month: number; year: number };
  icon: IconType;
  accent: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "ms",
    role: "Desenvolvedor e Analista de Dados",
    org: "Ministério da Saúde · DECAN",
    start: { month: 3, year: 2026 },
    icon: LuHeartPulse,
    accent: "#34D399",
    summary:
      "Desenvolvimento de sistemas e análise de dados na equipe de sistemas do DECAN.",
    highlights: [
      "Desenvolvimento e manutenção de sistemas web para gestão de dados em saúde",
      "Elaboração de dicionários de dados e documentação técnica de integração entre sistemas",
      "Análise de dados, relatórios e acompanhamento do cadastro junto às unidades de saúde",
    ],
    stack: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "SQL", "Power BI"],
  },
  {
    id: "sdufpe",
    role: "Programador Full Stack",
    org: "SD-UFPE",
    kind: "Pesquisa",
    start: { month: 9, year: 2023 },
    icon: LuFolderGit2,
    accent: "#8B7CFF",
    summary:
      "Desenvolvimento full stack de aplicações web e integração de dados.",
    highlights: [
      "Interfaces modernas com Next.js e TypeScript, focadas na experiência do usuário",
      "Criação e manutenção de APIs escaláveis com Node.js, Express e TypeORM",
      "Integração e análise de dados em PostgreSQL, com relatórios e dashboards no Power BI",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "TypeORM",
      "PostgreSQL",
      "Power BI",
    ],
  },
  {
    id: "censo-odonto",
    role: "Líder Técnico",
    org: "Censo de Odontologia Brasil",
    kind: "Pesquisa",
    start: { month: 6, year: 2026 },
    icon: TbDental,
    accent: "#38BDF8",
    summary: "Liderança técnica do sistema do Censo de Odontologia Brasil.",
    highlights: [
      "Gestão das equipes de front-end e back-end do projeto",
      "Definição técnica do funcionamento e da arquitetura do sistema",
    ],
    // TODO: adicionar as tecnologias do projeto
    stack: [],
  },
];

/** Início da experiência profissional, usado no contador de anos */
export const CAREER_START = new Date(2023, 8, 1); // 09/2023

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

/** Anos completos desde o início da carreira (mínimo 1) */
export const yearsOfExperience = Math.max(
  1,
  Math.floor((Date.now() - CAREER_START.getTime()) / YEAR_MS)
);
