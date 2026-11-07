import {
  CSSProperties,
  Dispatch,
  forwardRef,
  KeyboardEvent,
  SetStateAction,
  TouchEvent,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiFileText,
  FiGithub,
  FiMaximize2,
  FiUsers,
} from "react-icons/fi";
import GalleryComponent from "../gallery/component";
import { useInView } from "@/hooks/useInView";
import {
  ActionButton,
  Actions,
  Avatar,
  GroupBadge,
  Member,
  Team,
  Counter,
  Dot,
  Dots,
  ExpandHint,
  Info,
  InfoText,
  NavButton,
  Progress,
  ProjectsContainer,
  ProjectsHeader,
  ProjectsTitle,
  Segment,
  Shot,
  Slide,
  SlidePosition,
  Stage,
  Tags,
} from "./style";

type TeamMember = {
  name: string;
  role: string;
  link?: string;
  /** destaca o próprio autor do portfólio */
  me?: boolean;
};

type ProjectType = {
  name: string;
  pictures: string[];
  lang: string[];
  /** repositório (botão "Código"); ausente = botão oculto */
  link?: string;
  /** documentação (botão "Documentação"); ausente = botão oculto */
  doc?: string;
  description: string;
  /** projetos feitos em equipe mostram o selo e os integrantes */
  team?: TeamMember[];
};

export const projects: ProjectType[] = [
  {
    name: "Hell on Tap",
    pictures: [
      "hot1.jpg",
      "hot2.jpg",
      "hot3.jpg",
      "hot4.jpg",
      "hot5.jpg",
      "hot6.jpg",
    ],
    lang: [],
    description:
      "FPS retrô multiplayer no navegador, com a mira do Counter-Strike 1.6 e a cara do Doom: salas de até 10 jogadores, 25 armas, 9 personagens, modos Mata-mata e Casual 5v5 com bots de IA tática, clãs, inventário de skins e perfis com estatísticas.",
    team: [
      { name: "Igor", role: "Tech Lead & Front-end", me: true },
      {
        name: "Thiagox47",
        role: "Desenvolvedor Back-end",
        link: "https://www.txdev.site/",
      },
      {
        name: "lobbi.afx",
        role: "Analista Criativo & Design",
        link: "https://www.instagram.com/lobbi.afx/",
      },
    ],
  },
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
      "Java",
      "Java EE",
      "Servlet",
      "JSP",
      "Maven",
      "MySQL",
      "JavaScript",
      "CSS",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/SeuLivro-front",
    doc: "https://github.com/MrigortBr/SeuLivro-front/blob/main/README.md",
    description:
      "Plataforma para publicar e gerenciar livros: cada obra tem capa, autor, sinopse e PDF, com painel para editar e excluir o acervo.",
  },
  {
    name: "Nutrify",
    pictures: ["nutrify1.png", "nutrify2.png", "nutrify3.png", "nutrify4.png"],
    lang: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Knex",
      "Socket.io",
      "JWT",
      "Styled-components",
      "Nodemailer",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/Nutrify-api",
    doc: "https://docs.google.com/document/d/1-DaWLxD3akxGhibvsy5yoBKBfglWUEAL0PiEBgWwUoQ/edit?tab=t.0",
    description:
      "Rede social de nutrição com chat em tempo real para conversar com amigos, nutricionistas e um assistente de IA.",
  },
  {
    name: "Sday",
    pictures: ["sday1.jpeg", "sday2.jpeg", "sday3.png"],
    lang: [
      "Vue.js",
      "Bulma",
      "Node.js",
      "Express",
      "MySQL",
      "Knex",
      "Socket.io",
      "JWT",
      "Bcrypt",
      "Axios",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/Sday-Project",
    doc: "https://github.com/MrigortBr/Sday-Project/blob/main/README.md",
    description:
      "Planejamento colaborativo inspirado no Scrum: projetos divididos em grupos e subgrupos coloridos, com responsáveis atribuídos a cada tarefa.",
  },
  {
    name: "UpDelivery",
    pictures: [
      "updelivery1.png",
      "updelivery2.png",
      "updelivery3.png",
      "updelivery4.png",
    ],
    lang: [
      "Java",
      "Java EE",
      "Servlet",
      "JSP",
      "Maven",
      "MySQL",
      "JavaScript",
      "CSS",
      "Docker",
    ],
    link: "https://github.com/MrigortBr/UpDelivery",
    doc: "https://github.com/MrigortBr/UpDelivery/blob/main/README.md",
    description:
      "Delivery inspirado no iFood: clientes compram, salvam endereços e cartões e veem o histórico; lojistas criam loja, produtos e promoções.",
  },
];

/** Tempo que cada print fica na tela (ms) */
const AUTOPLAY_MS = 4500;
/** Distância mínima do arraste no celular para trocar de projeto (px) */
const SWIPE_THRESHOLD = 45;

const pad = (n: number) => String(n).padStart(2, "0");

/** Posição de cada slide em relação ao ativo, de forma circular. */
function getPosition(
  index: number,
  active: number,
  total: number
): SlidePosition {
  const half = Math.floor(total / 2);
  const offset = ((index - active + total + half) % total) - half;
  if (offset === 0) return "active";
  if (offset === -1) return "prev";
  if (offset === 1) return "next";
  return "hidden";
}

export function ProjectComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const total = projects.length;
  const [active, setActive] = useState(0);
  const [image, setImage] = useState(0);
  // Reinicia a animação mesmo quando o índice da imagem não muda (projeto com 1 print)
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [galleryMode, setGalleryMode] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // animações de entrada tocam quando a seção aparece (e repetem a cada visita)
  const visible = useInView(stageRef);

  const project = projects[active];
  const paused = hovered || galleryMode;

  const goTo = (index: number) => {
    setActive((index + total) % total);
    setImage(0);
    setCycle((c) => c + 1);
  };
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const nextImage = () => {
    setImage((i) => (i + 1) % project.pictures.length);
    setCycle((c) => c + 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <ProjectsContainer
      className='page'
      ref={ref}
      data-visible={visible ? "true" : "false"}
    >
      <ProjectsHeader>
        <ProjectsTitle>Projetos</ProjectsTitle>
        <Counter aria-live='polite'>
          <strong>{pad(active + 1)}</strong> / {pad(total)}
        </Counter>
      </ProjectsHeader>

      <Stage
        ref={stageRef}
        tabIndex={0}
        role='region'
        aria-roledescription='carrossel'
        aria-label='Projetos'
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map((p, i) => {
          const position = getPosition(i, active, total);
          const isActive = position === "active";

          return (
            <Slide
              key={p.name}
              $pos={position}
              aria-hidden={!isActive}
              onClick={() => {
                if (isActive) setGalleryMode(true);
                else goTo(i);
              }}
              onMouseEnter={isActive ? () => setHovered(true) : undefined}
              onMouseLeave={isActive ? () => setHovered(false) : undefined}
            >
              {p.pictures.map((pic, j) => (
                <Shot key={pic} $visible={isActive ? j === image : j === 0}>
                  <Image
                    src={`/projects/${pic}`}
                    alt={`${p.name} — tela ${j + 1}`}
                    fill
                    sizes='(max-width: 768px) 85vw, 55vw'
                    loading={j === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </Shot>
              ))}

              {isActive && (
                <>
                  <Progress $paused={paused}>
                    {p.pictures.map((pic, j) => (
                      <Segment
                        key={pic}
                        aria-label={`Ver tela ${j + 1}`}
                        data-state={
                          j < image ? "done" : j === image ? "current" : "todo"
                        }
                        style={
                          {
                            "--duration": `${AUTOPLAY_MS}ms`,
                          } as React.CSSProperties
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(j);
                          setCycle((c) => c + 1);
                        }}
                      >
                        <span
                          key={
                            j === image ? `${active}-${j}-${cycle}` : undefined
                          }
                          onAnimationEnd={j === image ? nextImage : undefined}
                        />
                      </Segment>
                    ))}
                  </Progress>
                  <ExpandHint>
                    <FiMaximize2 /> Ampliar
                  </ExpandHint>
                </>
              )}
            </Slide>
          );
        })}

        <NavButton
          className='prev'
          onClick={prev}
          aria-label='Projeto anterior'
        >
          <FiArrowLeft />
        </NavButton>
        <NavButton className='next' onClick={next} aria-label='Próximo projeto'>
          <FiArrowRight />
        </NavButton>
      </Stage>

      <Dots>
        {projects.map((p, i) => (
          <Dot
            key={p.name}
            $active={i === active}
            aria-label={`Ir para ${p.name}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </Dots>

      {/* key força a animação de entrada a cada troca de projeto */}
      <Info key={project.name}>
        <InfoText>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </InfoText>
        <Actions>
          {project.link && (
            <ActionButton
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              $variant='primary'
            >
              <FiGithub /> Código
            </ActionButton>
          )}
          {project.doc && (
            <ActionButton
              href={project.doc}
              target='_blank'
              rel='noopener noreferrer'
              $variant='ghost'
            >
              <FiFileText /> Documentação
            </ActionButton>
          )}
        </Actions>

        {project.team && (
          <Team>
            <GroupBadge>
              <FiUsers /> Projeto em grupo
            </GroupBadge>
            {project.team.map((member, i) => {
              const content = (
                <>
                  <Avatar aria-hidden>{member.name[0].toUpperCase()}</Avatar>
                  <span>
                    <strong>
                      {member.name}
                      {member.me && <em> (eu)</em>}
                    </strong>
                    <small>{member.role}</small>
                  </span>
                  {member.link && <FiArrowUpRight className='out' />}
                </>
              );
              return (
                <Member
                  key={member.name}
                  href={member.link}
                  target={member.link ? "_blank" : undefined}
                  rel={member.link ? "noopener noreferrer" : undefined}
                  style={{ "--i": i } as CSSProperties}
                  $me={member.me}
                >
                  {content}
                </Member>
              );
            })}
          </Team>
        )}

        {project.lang.length > 0 && (
          <Tags>
            {project.lang.map((lang, i) => (
              <li key={lang} style={{ "--i": i } as CSSProperties}>
                {lang}
              </li>
            ))}
          </Tags>
        )}
      </Info>

      {galleryMode ? (
        <GalleryComponent
          images={project.pictures}
          init={project.pictures[image]}
          title={project.name}
          onClose={() => {
            setGalleryMode(false);
            setHovered(false);
          }}
        />
      ) : null}
    </ProjectsContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ProjectComponent);
