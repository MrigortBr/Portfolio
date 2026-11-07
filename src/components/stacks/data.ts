import { IconType } from "react-icons";
import {
  SiAdobephotoshop,
  SiClaude,
  SiDbeaver,
  SiGithubcopilot,
  SiJsonwebtokens,
  SiK6,
  SiKnexdotjs,
  SiOllama,
  SiOpenai,
  SiSocketdotio,
  SiTypeorm,
  SiAndroidstudio,
  SiCodeigniter,
  SiCss3,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiLua,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNpm,
  SiOracle,
  SiPostgresql,
  SiPostman,
  SiPypi,
  SiPython,
  SiRailway,
  SiReact,
  SiRender,
  SiSpringboot,
  SiSqlite,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiYarn,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { TbBrandOffice, TbChartBar, TbPrompt, TbSql } from "react-icons/tb";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import {
  LuBrainCircuit,
  LuChartColumn,
  LuBox,
  LuCloud,
  LuCode,
  LuDatabase,
  LuDatabaseZap,
  LuMonitor,
  LuServer,
  LuSparkles,
  LuWrench,
} from "react-icons/lu";

export type Tech = {
  name: string;
  icon: IconType;
  /** cor da marca; sem cor = usa a cor do texto do tema (marcas pretas) */
  color?: string;
};

export type SkillGroup = {
  id:
    | "core"
    | "languages"
    | "databases"
    | "front"
    | "back"
    | "data"
    | "devops"
    | "ai"
    | "tools";
  title: string;
  subtitle?: string;
  icon: IconType;
  /** cor de destaque do card */
  accent: string;
  items: Tech[];
};

/* Catálogo único de tecnologias — evita repetir ícone/cor em cada grupo */
const T = {
  typescript: { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  javascript: { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  java: { name: "Java", icon: FaJava, color: "#E76F00" },
  python: { name: "Python", icon: SiPython, color: "#3776AB" },
  lua: { name: "Lua", icon: SiLua, color: "#5A6AE8" },

  mysql: { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  postgresql: { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  oracle: { name: "Oracle SQL", icon: SiOracle, color: "#F80000" },
  mongodb: { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  sqlite: { name: "SQLite", icon: SiSqlite, color: "#2F9FD8" },
  modeling: {
    name: "Modelagem de dados",
    icon: LuDatabaseZap,
    color: "#C084FC",
  },

  next: { name: "Next.js", icon: SiNextdotjs },
  react: { name: "React", icon: SiReact, color: "#61DAFB" },
  vue: { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  html: { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  css: { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  reactNative: { name: "React Native", icon: SiReact, color: "#61DAFB" },
  flutter: { name: "Flutter", icon: SiFlutter, color: "#02569B" },

  node: { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  express: { name: "Express", icon: SiExpress },
  nest: { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  spring: { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  django: { name: "Django", icon: SiDjango, color: "#44B78B" },
  flask: { name: "Flask", icon: SiFlask },
  codeigniter: { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
  typeorm: { name: "TypeORM", icon: SiTypeorm, color: "#FE0803" },
  knex: { name: "Knex", icon: SiKnexdotjs, color: "#D26B38" },
  socketio: { name: "Socket.io", icon: SiSocketdotio },
  jwt: { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },

  sql: { name: "SQL avançado", icon: TbSql, color: "#A78BFA" },
  excel: {
    name: "Excel avançado",
    icon: PiMicrosoftExcelLogo,
    color: "#21A366",
  },
  dbeaver: { name: "DBeaver", icon: SiDbeaver, color: "#C08A5B" },

  dockerCompose: { name: "Docker Compose", icon: SiDocker, color: "#2496ED" },
  k6: { name: "k6 (testes de carga)", icon: SiK6, color: "#7D64FF" },

  ollama: { name: "Ollama", icon: SiOllama },
  chatgpt: { name: "ChatGPT", icon: SiOpenai },
  claude: { name: "Claude", icon: SiClaude, color: "#D97757" },
  copilot: { name: "GitHub Copilot", icon: SiGithubcopilot },
  prompt: { name: "Prompt Engineering", icon: TbPrompt, color: "#38BDF8" },

  git: { name: "Git", icon: SiGit, color: "#F05032" },
  figma: { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  vscode: { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  photoshop: { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
  cinema4d: { name: "Cinema 4D", icon: LuBox, color: "#5B8DEF" },
  docker: { name: "Docker", icon: SiDocker, color: "#2496ED" },
  linux: { name: "Linux", icon: SiLinux, color: "#FCC624" },
  npm: { name: "npm", icon: SiNpm, color: "#CB3837" },
  pip: { name: "pip", icon: SiPypi, color: "#3775A9" },
  postman: { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  yarn: { name: "Yarn", icon: SiYarn, color: "#2C8EBB" },
  office: { name: "Pacote Office", icon: TbBrandOffice, color: "#D83B01" },
  powerbi: { name: "Power BI", icon: TbChartBar, color: "#F2C811" },
  androidStudio: {
    name: "Android Studio",
    icon: SiAndroidstudio,
    color: "#3DDC84",
  },
  nginx: { name: "Nginx", icon: SiNginx, color: "#009639" },

  vercel: { name: "Vercel", icon: SiVercel },
  railway: { name: "Railway", icon: SiRailway },
  render: { name: "Render", icon: SiRender },
  aws: { name: "AWS", icon: FaAws, color: "#FF9900" },
  gcloud: { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
} satisfies Record<string, Tech>;

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    title: "Stack principal",
    subtitle: "O que uso no dia a dia",
    icon: LuSparkles,
    accent: "#8B7CFF",
    items: [
      T.typescript,
      T.next,
      T.react,
      T.node,
      T.nest,
      T.postgresql,
      T.powerbi,
    ],
  },
  {
    id: "languages",
    title: "Linguagens",
    icon: LuCode,
    accent: "#FACC15",
    items: [T.typescript, T.javascript, T.java, T.python, T.lua],
  },
  {
    id: "databases",
    title: "Bancos de dados",
    icon: LuDatabase,
    accent: "#E879F9",
    items: [T.postgresql, T.mysql, T.oracle, T.mongodb, T.sqlite, T.modeling],
  },
  {
    id: "front",
    title: "Front-end",
    icon: LuMonitor,
    accent: "#818CF8",
    items: [T.next, T.react, T.vue, T.html, T.css, T.reactNative, T.flutter],
  },
  {
    id: "back",
    title: "Back-end & ORMs",
    icon: LuServer,
    accent: "#4ADE80",
    items: [
      T.node,
      T.nest,
      T.express,
      T.typeorm,
      T.knex,
      T.socketio,
      T.jwt,
      T.spring,
      T.django,
      T.flask,
      T.codeigniter,
    ],
  },
  {
    id: "data",
    title: "Dados & BI",
    icon: LuChartColumn,
    accent: "#FB923C",
    items: [T.sql, T.powerbi, T.excel, T.dbeaver],
  },
  {
    id: "ai",
    title: "Inteligência Artificial",
    icon: LuBrainCircuit,
    accent: "#38BDF8",
    items: [T.ollama, T.chatgpt, T.claude, T.copilot, T.prompt],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: LuCloud,
    accent: "#F87171",
    items: [
      T.docker,
      T.dockerCompose,
      T.nginx,
      T.k6,
      T.vercel,
      T.railway,
      T.render,
      T.aws,
      T.gcloud,
    ],
  },
  {
    id: "tools",
    title: "Ferramentas",
    icon: LuWrench,
    accent: "#2DD4BF",
    items: [
      T.git,
      T.linux,
      T.vscode,
      T.postman,
      T.figma,
      T.office,
      T.photoshop,
      T.cinema4d,
      T.androidStudio,
      T.npm,
      T.yarn,
      T.pip,
    ],
  },
];

/** Total de tecnologias únicas (exibido no topo da seção) */
export const totalTechs = new Set(
  skillGroups.flatMap((g) => g.items.map((i) => i.name))
).size;
