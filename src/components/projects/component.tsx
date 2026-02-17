import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ButtonSwitch,
  CurrentProject,
  Languages,
  LanguagesWrapper,
  OtherProject,
  ProjectPicture,
  ProjectsContainer,
  ProjectsTitle,
  ProjectsWrapper,
} from "./style";
import GalleryComponent from "../gallery/component";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/isMobile";

type ProjectType = {
  name: string;
  pictures: string[];
  lang: string[];
  link: string;
  doc: string;
  description: string;
};

const projects: ProjectType[] = [
  {
    name: "SeuLivro",
    pictures: [
      "seulivro1.png",
      "seulivro2.png",
      "seulivro3.png",
      "seulivro4.png",
      "seulivro5.png",
      "seulivro6.png",
    ],
    lang: [
      "Vue.js",
      "css",
      "Java EE",
      "Mysql",
      "jsp",
      "JavaScript",
      "Servlet",
      "Maven",
      "Java",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/SeuLivro-front",
    doc: "https://github.com/MrigortBr/SeuLivro-front/blob/main/README.md",

    description: "Uma descrição sobre o projeto SeuLivro",
  },
  {
    name: "Nutrify",
    pictures: ["nutrify1.png", "nutrify2.png", "nutrify3.png", "nutrify4.png"],
    lang: [
      "typescript",
      "react",
      "next.js",
      "node.js",
      "express",
      "postgresql",
      "knex",
      "axios",
      "socket.io",
      "styled-components",
      "backend",
      "jwt",
      "bcrypt",
      "nodemailer",
      "dotenv",
      "lint",
      "Docker",
      "prettier",
    ],
    link: "https://github.com/MrigortBr/Nutrify-api",
    doc: "https://docs.google.com/document/d/1-DaWLxD3akxGhibvsy5yoBKBfglWUEAL0PiEBgWwUoQ/edit?tab=t.0",
    description: "Uma descrição sobre o projeto Nutrify",
  },
  {
    name: "Sday",
    pictures: ["sday1.jpeg", "sday2.jpeg", "sday3.png"],
    lang: [
      "Vue.js",
      "Node.js",
      "Bulma.css",
      "MySql",
      "knex",
      "Socket.io",
      "animation.js",
      "socket.io",
      "bcrypt",
      "jsonwebtoken",
      "Express",
      "Axios",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/Sday-Project",
    doc: "https://github.com/MrigortBr/Sday-Project/blob/main/README.md",

    description: "Uma descrição sobre o projeto Sday",
  },
  {
    name: "UpDelivery",
    pictures: [
      "UpDelivery1.png",
      "UpDelivery2.png",
      "UpDelivery3.png",
      "UpDelivery4.png",
    ],
    lang: [
      "Java EE",
      "Mysql",
      "jsp",
      "JavaScript",
      "Servlet",
      "Maven",
      "css",
      "Java",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/UpDelivery",
    doc: "https://github.com/MrigortBr/UpDelivery/blob/main/README.md",

    description: "Uma descrição sobre o projeto UpDelivery",
  },
];

export function ProjectComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevProject, setPrevProject] = useState<ProjectType>(projects[0]);
  const [project, setProject] = useState<ProjectType>(projects[1]);
  const [nextProject, setNextProject] = useState<ProjectType>(projects[2]);
  const [opacity, setOpacity] = useState(1);
  const [galleryMode, setGalleryMode] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const changeImage = (nextIndex: number) => {
    resetTimer();
    setOpacity(0);
    resetTimer();
    setTimeout(() => {
      setCurrentImage(nextIndex);
      setOpacity(1);
    }, 300);
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const next =
        (currentImage + 1 + project.pictures.length) % project.pictures.length;
      changeImage(next);
    }, 1700);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    resetTimer();
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentImage]);

  function update(value: number) {
    const index =
      (projects.findIndex((p) => p.name == project.name) +
        value +
        projects.length) %
      projects.length;
    const prevIndex = (index - 1 + projects.length) % projects.length;
    const nextIndex = (index + 1 + projects.length) % projects.length;

    setPrevProject(projects[prevIndex]);
    setProject(projects[index]);
    setNextProject(projects[nextIndex]);

    setCurrentImage(0);
  }

  function closeGallery() {
    setGalleryMode(false);
    startTimer();
  }

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <ProjectsContainer className='page' ref={ref}>
      <ProjectsTitle>Projetos</ProjectsTitle>
      <ProjectsWrapper>
        <OtherProject>
          <ProjectPicture
            onClick={() => {
              update(-1);
            }}
            key={currentImage}
            src={`/projects/${prevProject.pictures[0]}`}
            alt='Slide'
            width={1920}
            height={1080}
            className='blur5px'
            loading='eager'
          />
        </OtherProject>
        <ButtonSwitch
          $visible={isMobile}
          style={{ left: "1vw" }}
          onClick={() => {
            update(1);
          }}
        >
          {"<"}
        </ButtonSwitch>
        <CurrentProject>
          <ProjectPicture
            onClick={(e) => {
              resetTimer();
              setGalleryMode(true);
            }}
            $opacity={opacity}
            src={`/projects/${project.pictures[currentImage]}`}
            alt='Slide'
            width={1920}
            height={1080}
            className='rounded-lg'
            loading='eager'
          />
        </CurrentProject>
        <ButtonSwitch
          style={{ right: "1vw" }}
          $visible={isMobile}
          onClick={() => {
            update(1);
          }}
        >
          {">"}
        </ButtonSwitch>
        <OtherProject>
          <ProjectPicture
            onClick={() => {
              update(1);
            }}
            src={`/projects/${nextProject.pictures[0]}`}
            alt='Slide'
            width={1920}
            height={1080}
            className='blur5px'
            loading='eager'
          />
        </OtherProject>
        <LanguagesWrapper>
          <IoIosInformationCircleOutline
            onClick={() => {
              openLink(project.doc);
            }}
            style={{ marginRight: "auto", marginTop: "auto" }}
          ></IoIosInformationCircleOutline>
          <Languages>
            {project.lang.map((lang) => {
              return <p key={`${project.name}-${lang}`}>{lang}</p>;
            })}
          </Languages>
          <FaGithub
            onClick={() => {
              openLink(project.link);
            }}
            style={{ marginLeft: "auto", marginTop: "auto" }}
          ></FaGithub>
        </LanguagesWrapper>
      </ProjectsWrapper>
      {galleryMode ? (
        <GalleryComponent
          images={project.pictures}
          init={`${project.pictures[currentImage]}`}
          onClose={closeGallery}
        />
      ) : null}
    </ProjectsContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ProjectComponent);
