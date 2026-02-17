import {
  BarBackground,
  BarFill,
  Card,
  SkillContainer,
  SkillHeader,
  Title,
} from "./style";
import { SkillLevel } from "./type";

export function ProficiencyCard({ data }: { data: SkillLevel[] }) {
  return (
    <Card>
      <Title>Níveis de proficiência</Title>

      {data.map((skill, index) => (
        <SkillContainer key={index}>
          <SkillHeader>
            <span>{skill.name}</span>
            <span>{skill.percentage}%</span>
          </SkillHeader>

          <BarBackground>
            <BarFill $percentage={skill.percentage} />
          </BarBackground>
        </SkillContainer>
      ))}
    </Card>
  );
}
