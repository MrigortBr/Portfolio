import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Counter, ProjectsHeader, ProjectsTitle } from "../projects/style";
import CountUp from "../countUp/component";
import { useFitToHeight } from "@/hooks/useFitToHeight";
import { skillGroups, totalTechs } from "./data";
import {
  Chip,
  Chips,
  CoreItem,
  CoreList,
  Count,
  GroupCard,
  GroupHeader,
  GroupIcon,
  Grid,
  StackContainer,
} from "./style";

export function StacksComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const gridRef = useRef<HTMLDivElement>(null);
  // Quais cards estão na tela. As animações de entrada tocam quando o card
  // aparece e são reiniciadas quando ele sai — assim repetem a cada visita.
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  useFitToHeight(gridRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (!id) continue;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15)
              next[id] = true;
            else if (!entry.isIntersecting) next[id] = false;
          }
          return next;
        });
      },
      { threshold: [0, 0.15] }
    );

    grid
      .querySelectorAll<HTMLElement>("[data-id]")
      .forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const sectionVisible = Object.values(visibleCards).some(Boolean);

  return (
    <StackContainer ref={ref} className='page'>
      <ProjectsHeader>
        <ProjectsTitle>Competências</ProjectsTitle>
        <Counter>
          <strong>
            <CountUp to={totalTechs} active={sectionVisible} />
          </strong>{" "}
          tecnologias
        </Counter>
      </ProjectsHeader>

      <Grid ref={gridRef}>
        {skillGroups.map((group, i) => (
          <GroupCard
            key={group.id}
            $area={group.id}
            $core={group.id === "core"}
            data-id={group.id}
            data-visible={visibleCards[group.id] ? "true" : "false"}
            style={
              {
                "--accent": group.accent,
                "--delay": `${i * 70}ms`,
              } as CSSProperties
            }
          >
            <GroupHeader>
              <GroupIcon>
                <group.icon />
              </GroupIcon>
              <div>
                <h2>{group.title}</h2>
                {group.subtitle && <p>{group.subtitle}</p>}
              </div>
              <Count>{group.items.length}</Count>
            </GroupHeader>

            {group.id === "core" ? (
              <CoreList>
                {group.items.map((tech, j) => (
                  <CoreItem
                    key={tech.name}
                    style={{ "--i": j } as CSSProperties}
                  >
                    <tech.icon style={{ color: tech.color }} />
                    <span>{tech.name}</span>
                  </CoreItem>
                ))}
              </CoreList>
            ) : (
              <Chips>
                {group.items.map((tech, j) => (
                  <Chip key={tech.name} style={{ "--i": j } as CSSProperties}>
                    <tech.icon style={{ color: tech.color }} />
                    {tech.name}
                  </Chip>
                ))}
              </Chips>
            )}
          </GroupCard>
        ))}
      </Grid>
    </StackContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(StacksComponent);
