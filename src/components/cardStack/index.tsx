import { Badge, Card, Header, Tag, Tags, Title } from "./style";
import { CardType } from "./type";

type Prop = {
  items: CardType;
};

export function SkillCard({
  items: { badge, BadgeIcon, title, background, colorBadge, colorItens, items },
}: Prop) {
  return (
    <Card>
      <Header>
        <Badge style={{ background: background, color: colorBadge }}>
          {BadgeIcon ? <BadgeIcon size={16} /> : badge}
        </Badge>
        <Title>{title}</Title>
      </Header>

      <Tags>
        {items.map((item, index) => (
          <Tag key={index} $color={colorItens}>
            {item}
          </Tag>
        ))}
      </Tags>
    </Card>
  );
}
