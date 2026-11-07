import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { LuAward, LuCalendar, LuClock } from "react-icons/lu";
import { useInView } from "@/hooks/useInView";
import CountUp from "../countUp/component";
import { Counter, ProjectsHeader, ProjectsTitle } from "../projects/style";
import {
  Certificate,
  CertificateCategory,
  categories,
  categoryAccent,
  certificates,
  totalHours,
} from "./data";
import {
  Card,
  CardHeader,
  CardsGrid,
  CertificatesContainer,
  FilterButton,
  Filters,
  Logo,
  Meta,
  Tags,
} from "./style";

type Filter = CertificateCategory | "todos";

/** Atraso máximo da cascata — evita que os últimos cards demorem demais */
const MAX_STAGGER_INDEX = 14;

/** Marca no grid se há conteúdo escondido acima/abaixo, para o esmaecimento das bordas */
const updateScrollEdges = (el: HTMLElement) => {
  el.dataset.atTop = String(el.scrollTop <= 2);
  el.dataset.atBottom = String(
    el.scrollTop + el.clientHeight >= el.scrollHeight - 2
  );
};

const countOf = (filter: Filter) =>
  filter === "todos"
    ? certificates.length
    : certificates.filter((c) => c.category === filter).length;

function CertificatesComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const visible = useInView(contentRef);
  const [filter, setFilter] = useState<Filter>("todos");

  const list: Certificate[] =
    filter === "todos"
      ? certificates
      : certificates.filter((c) => c.category === filter);

  return (
    <CertificatesContainer ref={ref} className='page'>
      <ProjectsHeader>
        <ProjectsTitle>Certificados</ProjectsTitle>
        <Counter>
          <strong>
            <CountUp to={certificates.length} active={visible} />
          </strong>{" "}
          certificados ·{" "}
          <strong>
            <CountUp
              to={totalHours}
              active={visible}
              format={(v) => v.toLocaleString("pt-BR")}
            />
          </strong>{" "}
          horas
        </Counter>
      </ProjectsHeader>

      <Filters
        ref={contentRef}
        data-visible={visible ? "true" : "false"}
        role='tablist'
        aria-label='Filtrar certificados'
      >
        {categories.map((cat, i) => (
          <FilterButton
            key={cat.id}
            role='tab'
            aria-selected={filter === cat.id}
            $active={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            style={
              { "--i": i, "--accent": categoryAccent[cat.id] } as CSSProperties
            }
          >
            {cat.label}
            <span>{countOf(cat.id)}</span>
          </FilterButton>
        ))}
      </Filters>

      {/* key: troca de filtro remonta a lista e repete a cascata */}
      <CardsGrid
        key={filter}
        data-visible={visible ? "true" : "false"}
        data-at-top='true'
        data-at-bottom='false'
        role='tabpanel'
        onScroll={(e) => updateScrollEdges(e.currentTarget)}
      >
        {list.map((c, i) => (
          <Card
            key={`${c.title}-${c.date}`}
            style={
              {
                "--i": Math.min(i, MAX_STAGGER_INDEX),
                "--accent": categoryAccent[c.category],
              } as CSSProperties
            }
          >
            <CardHeader>
              <Logo>
                {c.img ? (
                  <Image src={c.img} width={40} height={40} alt='' />
                ) : (
                  <LuAward className='fallback' />
                )}
              </Logo>
              <div>
                <h3 title={c.title}>{c.title}</h3>
                <p>{c.issuer}</p>
              </div>
            </CardHeader>
            <Meta>
              <span>
                <LuClock /> {c.hours}h
              </span>
              <span>
                <LuCalendar /> {c.date}
              </span>
            </Meta>
            <Tags>
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </Tags>
          </Card>
        ))}
      </CardsGrid>
    </CertificatesContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(CertificatesComponent);
