import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ButtonSwitch,
  CertificatesContainer,
  CertificatesListContainer,
  CertificatesListItem,
  CertificatesTitle,
  Tag,
  Tags,
} from "./style";
import Image from "next/image";
import { certificates } from "./data";
import { useIsMobile } from "@/hooks/isMobile";

function CertificatesComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const isMobile = useIsMobile();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(11);
  const [sum, setSum] = useState(12);

  useEffect(() => {
    const set = () => {
      setMax(isMobile ? 3 : 11);
      setSum(isMobile ? 4 : 12);
    };

    set();
  }, [isMobile]);

  return (
    <CertificatesContainer className='page' ref={ref}>
      <CertificatesTitle>Certificados</CertificatesTitle>
      <CertificatesListContainer>
        <ButtonSwitch
          style={{ right: "1vw" }}
          $visible={max < certificates.length}
          onClick={() => {
            setMin((old) => old + sum);
            setMax((old) => old + sum);
          }}
        >
          {">"}
        </ButtonSwitch>
        <ButtonSwitch
          style={{ left: "1vw" }}
          $visible={min != 0}
          onClick={() => {
            setMin((old) => old - sum);
            setMax((old) => old - sum);
          }}
        >
          {"<"}
        </ButtonSwitch>
        {certificates.map((c, i) => {
          if (i >= min && i <= max)
            return (
              <CertificatesListItem key={i}>
                <h1>
                  <Image
                    src={c.img}
                    width={32}
                    height={32}
                    alt='Guia do programador logo'
                  ></Image>
                  {c.title}
                </h1>
                <p>{c.hours}</p>
                <Tags>
                  <Tag>{c.tag[0]}</Tag>
                  <Tag>{c.tag[1]}</Tag>
                  <Tag>{c.tag[2]}</Tag>
                </Tags>
              </CertificatesListItem>
            );
        })}
      </CertificatesListContainer>
    </CertificatesContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(CertificatesComponent);
