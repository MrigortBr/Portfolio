import { Dispatch, forwardRef, SetStateAction } from "react";
import { StackCard, StackContainer, StackTitle } from "./style";
import { SkillCard } from "../cardStack";
import {
  Back,
  databases,
  Deploy,
  Front,
  languageData,
  proficiencyData,
  Tools,
} from "./data";
import { ProficiencyCard } from "../proficiency/component";
import { useIsMobile } from "@/hooks/isMobile";

export function StacksComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const isMobile = useIsMobile();

  return (
    <StackContainer ref={ref} className='page'>
      <StackTitle>Competências</StackTitle>
      <StackCard>
        <SkillCard items={languageData}></SkillCard>
        <SkillCard items={databases}></SkillCard>
        <SkillCard items={Front}></SkillCard>
        <SkillCard items={Tools}></SkillCard>
        <SkillCard items={Back}></SkillCard>
        {!isMobile ? (
          <ProficiencyCard data={proficiencyData}></ProficiencyCard>
        ) : (
          <SkillCard items={Deploy}></SkillCard>
        )}
        {isMobile ? (
          <ProficiencyCard data={proficiencyData}></ProficiencyCard>
        ) : (
          <SkillCard items={Deploy}></SkillCard>
        )}
      </StackCard>
    </StackContainer>
  );
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(StacksComponent);
