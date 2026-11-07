export type CertificateCategory =
  | "programacao"
  | "dados"
  | "mobile"
  | "ferramentas"
  | "fundamentos"
  | "saude";

export type Certificate = {
  /** logo da instituição; sem logo = ícone de certificado */
  img?: string;
  title: string;
  issuer: string;
  /** carga horária */
  hours: number;
  /** mês/ano de conclusão */
  date: string;
  tags: string[];
  category: CertificateCategory;
};

/** Cor suave de cada categoria (mesma paleta da seção Competências) */
export const categoryAccent: Record<CertificateCategory | "todos", string> = {
  todos: "#8B7CFF",
  programacao: "#A78BFA",
  dados: "#FB923C",
  mobile: "#38BDF8",
  ferramentas: "#2DD4BF",
  fundamentos: "#4ADE80",
  saude: "#F472B6",
};

export const categories: {
  id: CertificateCategory | "todos";
  label: string;
}[] = [
  { id: "todos", label: "Todos" },
  { id: "programacao", label: "Programação" },
  { id: "dados", label: "Dados & BI" },
  { id: "mobile", label: "Mobile" },
  { id: "ferramentas", label: "Git & Ferramentas" },
  { id: "saude", label: "Saúde pública" },
  { id: "fundamentos", label: "Fundamentos" },
];

/** Ordenados do mais recente para o mais antigo */
export const certificates: Certificate[] = [
  {
    title:
      "Oficina de Articulação da Rede de Apoio à Execução do Censo dos Centros de Especialidades Odontológicas (CEO) e dos Serviços de Especialidades em Saúde Bucal (Sesb)",
    issuer: "Censo CEO e Sesb · Brasil 2026",
    hours: 12,
    date: "09/2026",
    tags: ["Saúde Bucal", "SUS", "Censo"],
    category: "saude",
  },
  {
    img: "/bradesco.png",
    title: "GenAI & Dados",
    issuer: "Fundação Bradesco",
    hours: 52,
    date: "08/2026",
    tags: ["IA Generativa", "Dados", "Prompt"],
    category: "dados",
  },
  {
    img: "/Udemy.svg",
    title: "Curso de JavaScript e TypeScript do Básico ao Avançado",
    issuer: "Udemy · Luiz Otávio Miranda",
    hours: 146,
    date: "07/2025",
    tags: ["Node.js", "TypeScript", "Backend"],
    category: "programacao",
  },
  {
    img: "/bradesco.png",
    title: "Administrando Banco de Dados",
    issuer: "Fundação Bradesco",
    hours: 8,
    date: "04/2025",
    tags: ["MySQL", "Dados", "Gerenciamento"],
    category: "dados",
  },
  {
    img: "/bradesco.png",
    title: "Implementação de Banco de Dados",
    issuer: "Fundação Bradesco",
    hours: 15,
    date: "03/2025",
    tags: ["MySQL", "Dados", "Implementação"],
    category: "dados",
  },
  {
    img: "/bradesco.png",
    title: "Modelagem de Dados",
    issuer: "Fundação Bradesco",
    hours: 15,
    date: "03/2025",
    tags: ["MySQL", "Dados", "Modelagem"],
    category: "dados",
  },
  {
    img: "/bradesco.png",
    title: "Desenvolvendo Aplicações Mobile com Android Studio",
    issuer: "Fundação Bradesco",
    hours: 15,
    date: "06/2024",
    tags: ["Mobile", "Android", "Front"],
    category: "mobile",
  },
  {
    img: "/Udemy.svg",
    title: "Curso Completo de Flutter",
    issuer: "Udemy · Flutterando",
    hours: 15,
    date: "06/2024",
    tags: ["Flutter", "Mobile", "Front"],
    category: "mobile",
  },
  {
    img: "/microsoft_logo.svg",
    title: "Comece a criar com o Power BI",
    issuer: "Microsoft Learn",
    hours: 2,
    date: "05/2024",
    tags: ["Power BI", "Organização", "Dados"],
    category: "dados",
  },
  {
    img: "/bradesco.png",
    title: "Projetos de Sistemas de TI",
    issuer: "Fundação Bradesco",
    hours: 15,
    date: "03/2024",
    tags: ["Análise", "Projetos", "Redes"],
    category: "fundamentos",
  },
  {
    img: "/microsoft_logo.svg",
    title: "Curso GH-100T00-A: conceitos básicos do GitHub",
    issuer: "Microsoft Learn",
    hours: 24,
    date: "02/2024",
    tags: ["GitHub", "Versionamento", "Comandos"],
    category: "ferramentas",
  },
  {
    img: "/guiadoprogramador.jpeg",
    title: "Formação Node.js",
    issuer: "Guia do Programador",
    hours: 50,
    date: "05/2023",
    tags: ["API", "JavaScript", "Node.js"],
    category: "programacao",
  },
  {
    img: "/geeklogo.jpeg",
    title: "Programação em JavaScript do Básico ao Avançado",
    issuer: "Geek University",
    hours: 27,
    date: "02/2023",
    tags: ["HTML", "JavaScript", "DOM"],
    category: "programacao",
  },
  {
    img: "/mundojs.webp",
    title: "Introdução ao JavaScript",
    issuer: "MundoJS",
    hours: 8,
    date: "01/2023",
    tags: ["HTML", "JavaScript", "DOM"],
    category: "programacao",
  },
  {
    img: "/unifacolLogo.svg",
    title: "Curso Básico de Arduino",
    issuer: "Unifacol · Expofacol 2022",
    hours: 25,
    date: "11/2022",
    tags: ["C", "Arduino", "Automação"],
    category: "fundamentos",
  },
  {
    img: "/unifacolLogo.svg",
    title: "Lego Scrum",
    issuer: "Unifacol · Expofacol 2022",
    hours: 25,
    date: "11/2022",
    tags: ["Scrum", "Metodologia", "Grupo"],
    category: "fundamentos",
  },
  {
    img: "/bradesco.png",
    title: "Visualizando Dados no Power BI",
    issuer: "Fundação Bradesco",
    hours: 10,
    date: "09/2022",
    tags: ["Power BI", "Dados", "Visualização"],
    category: "dados",
  },
  {
    img: "/bradesco.png",
    title: "Modelando Dados no Power BI",
    issuer: "Fundação Bradesco",
    hours: 8,
    date: "09/2022",
    tags: ["Power BI", "Dados", "Modelagem"],
    category: "dados",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Git e GitHub",
    issuer: "Curso em Vídeo",
    hours: 20,
    date: "07/2022",
    tags: ["GitHub", "Git", "Comandos"],
    category: "ferramentas",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "MySQL",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "07/2022",
    tags: ["MySQL", "SQL", "Banco de dados"],
    category: "dados",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "PHP Básico",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "07/2022",
    tags: ["PHP", "Básico", "Backend"],
    category: "programacao",
  },
  {
    img: "/planilheirosLogo.svg",
    title: "Curso de Power BI",
    issuer: "Planilheiros",
    hours: 8,
    date: "06/2022",
    tags: ["Power BI", "Dados", "Modelagem"],
    category: "dados",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Python 3 Mundo III",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "04/2022",
    tags: ["Python", "POO", "pip"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Python 3 Mundo II",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "04/2022",
    tags: ["Python", "PyCharm", "pip"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Python 3 Mundo I",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "04/2022",
    tags: ["Python", "Tkinter", "PyCharm"],
    category: "programacao",
  },
  {
    img: "/cfb.jpeg",
    title: "Curso de Lua",
    issuer: "CFBCursos",
    hours: 3,
    date: "04/2022",
    tags: ["Lua", "Scripts", "Algoritmos"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "HTML5",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "03/2022",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Java POO",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "02/2022",
    tags: ["Java", "POO", "IDE"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Java Básico",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "02/2022",
    tags: ["Java", "Básico", "NetBeans"],
    category: "programacao",
  },
  {
    img: "/cursoemvideo.jpg",
    title: "Algoritmos",
    issuer: "Curso em Vídeo",
    hours: 40,
    date: "02/2022",
    tags: ["Algoritmos", "Básico", "Lógica"],
    category: "programacao",
  },
  {
    img: "/danki_logo.png",
    title: "Curso Desenvolvimento de Games Completo",
    issuer: "Danki Code",
    hours: 60,
    date: "02/2022",
    tags: ["Java", "Games", "Fundamentos"],
    category: "programacao",
  },
  {
    img: "/ete.png",
    title: "Fundamentos Básicos de Redes",
    issuer: "ETE José Joaquim da Silva Filho",
    hours: 60,
    date: "06/2019",
    tags: ["Redes", "Computador", "Básico"],
    category: "fundamentos",
  },
  {
    img: "/ete.png",
    title: "Manutenção de Computadores",
    issuer: "ETE José Joaquim da Silva Filho",
    hours: 60,
    date: "06/2019",
    tags: ["Manutenção", "Computador", "Peças"],
    category: "fundamentos",
  },
];

export const totalHours = certificates.reduce((sum, c) => sum + c.hours, 0);
