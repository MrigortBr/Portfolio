import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
} from "react";
import { LuCalendar, LuCheck, LuHourglass } from "react-icons/lu";
import { useInView } from "@/hooks/useInView";
import CountUp from "../countUp/component";
import { Counter, ProjectsHeader, ProjectsTitle } from "../projects/style";
import { experiences, yearsOfExperience } from "./data";
import {
  Card,
  CardHeader,
  CurrentBadge,
  Duration,
  ExperienceContainer,
  Highlights,
  Icon,
  Item,
  KindTag,
  Node,
  Period,
  Stack,
  Summary,
  Timeline,
} from "./style";

type MonthYear = { month: number; year: number };

const pad = (n: number) => String(n).padStart(2, "0");
const formatMonth = ({ month, year }: MonthYear) => `${pad(month)}/${year}`;

/** Tempo no cargo, ex.: "8 meses", "1 ano", "3 anos e 2 meses" */
function formatDuration(start: MonthYear, end?: MonthYear) {
  const now = new Date();
  const to = end
    ? new Date(end.year, end.month - 1, 1)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const from = new Date(start.year, start.month - 1, 1);

  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  months = Math.max(0, months);

  if (months < 1) return "menos de 1 mês";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const y = years ? `${years} ${years === 1 ? "ano" : "anos"}` : "";
  const m = rest ? `${rest} ${rest === 1 ? "mês" : "meses"}` : "";
  return [y, m].filter(Boolean).join(" e ");
}

function ExperienceComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const visible = useInView(timelineRef);

  return (
    <ExperienceContainer ref={ref} className='page'>
      <ProjectsHeader>
        <ProjectsTitle>Experiência</ProjectsTitle>
        <Counter>
          <strong>
            <CountUp to={yearsOfExperience} active={visible} duration={800} />+
          </strong>{" "}
          anos de experiência
        </Counter>
      </ProjectsHeader>

      <Timeline ref={timelineRef} data-visible={visible ? "true" : "false"}>
        {experiences.map((exp, i) => (
          <Item
            key={exp.id}
            style={{ "--accent": exp.accent, "--i": i } as CSSProperties}
          >
            <Node $current={!exp.end} aria-hidden />

            <Card>
              <CardHeader>
                <Icon>
                  <exp.icon />
                </Icon>
                <div>
                  <h3>{exp.role}</h3>
                  <p>{exp.org}</p>
                </div>
                <aside>
                  {exp.kind && <KindTag>{exp.kind}</KindTag>}
                  <Period>
                    <LuCalendar />{" "}
                    {exp.end
                      ? `${formatMonth(exp.start)} – ${formatMonth(exp.end)}`
                      : `desde ${formatMonth(exp.start)}`}
                  </Period>
                  <Duration>
                    <LuHourglass /> {formatDuration(exp.start, exp.end)}
                  </Duration>
                  {!exp.end && <CurrentBadge>Atual</CurrentBadge>}
                </aside>
              </CardHeader>

              <Summary>{exp.summary}</Summary>

              {exp.highlights.length > 0 && (
                <Highlights>
                  {exp.highlights.map((h, j) => (
                    <li key={h} style={{ "--j": j } as CSSProperties}>
                      <LuCheck />
                      <span>{h}</span>
                    </li>
                  ))}
                </Highlights>
              )}

              {exp.stack.length > 0 && (
                <Stack>
                  {exp.stack.map((tech, j) => (
                    <li key={tech} style={{ "--j": j } as CSSProperties}>
                      {tech}
                    </li>
                  ))}
                </Stack>
              )}
            </Card>
          </Item>
        ))}
      </Timeline>
    </ExperienceContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ExperienceComponent);
