import { Dispatch, forwardRef, SetStateAction } from "react";
import {
  CertificatesContainer,
  CertificatesListContainer,
  CertificatesListItem,
  CertificatesTitle,
  Tag,
  Tags,
} from "./style";
import Image from "next/image";
import { certificates } from "./data";

function CertificatesComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <CertificatesContainer className='page' ref={ref}>
      <CertificatesTitle>Certificados</CertificatesTitle>
      <CertificatesListContainer>
        {certificates.map((c, i) => {
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
