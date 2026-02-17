import { CardType } from "../cardStack/type";
import { GoDatabase, GoCode } from "react-icons/go";
import { FaCodepen } from "react-icons/fa";
import { SkillLevel } from "../proficiency/type";
import { FaTools } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";

export const languageData: CardType = {
  badge: "Ao",
  title: "Linguagens",
  background: "#4d3c11",
  colorBadge: "#facc15",
  colorItens: "#4d3c11",
  items: ["Typescript", "Java", "JavaScript", "Lya", "Python"],
};

export const databases: CardType = {
  BadgeIcon: GoDatabase,
  title: "Database & Storage",
  background: "#d414cb",
  colorBadge: "#ffffff",
  colorItens: "#910e8a",
  items: [
    "MySql",
    "PostgreSql",
    "OracleSql",
    "MongoDB",
    "Sqlite",
    "Design database",
  ],
};

export const Front: CardType = {
  BadgeIcon: FaCodepen,
  title: "Frontend Development",
  background: "#030461",
  colorBadge: "#7173db",
  colorItens: "#01022e",
  items: [
    "Next.js",
    "Vue.js",
    "React",
    "HTML5",
    "CSS3",
    "React Native",
    "Flutter",
    "CodeIgniter",
  ],
};

export const Back: CardType = {
  BadgeIcon: GoCode,
  title: "Backend Development",
  background: "#0b5f20",
  colorBadge: "#60e280",
  colorItens: "#054e18",
  items: [
    "Node.js",
    "Express.js",
    "Nest.js",
    "Springboot",
    "Django",
    "Flask",
    "WebSockets",
  ],
};

export const Tools: CardType = {
  BadgeIcon: FaTools,
  title: "Ferramentas",
  background: "#099778",
  colorBadge: "#62ecce",
  colorItens: "#08725b",
  items: [
    "Git",
    "FIgma",
    "VS code",
    "Adobe Photoshop",
    "Cinema4D",
    "Docker",
    "Linux",
    "npm",
    "pip",
    "Postman",
    "yarn",
    "Pacote Office",
    "Power BI",
    "Android Studio",
    "Nginx",
  ],
};

export const Deploy: CardType = {
  BadgeIcon: LuBrain,
  title: "Implantaçao",
  background: "#750606",
  colorBadge: "#f01111",
  colorItens: "#5f0606",
  items: ["Vercel", "Railway", "Render", "AWS", "Google Cloud"],
};

export const proficiencyData: SkillLevel[] = [
  { name: "JavaScript", percentage: 90 },
  { name: "React.js", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "MongoDB", percentage: 75 },
  { name: "CSS/Tailwind", percentage: 85 },
  { name: "Express.js", percentage: 80 },
];
