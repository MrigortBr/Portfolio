import { VscSourceControl } from "react-icons/vsc";
import { PiCertificateThin } from "react-icons/pi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { AcitivityBar, IconWrapper } from "./style";
import { openExternal } from "../externalLink/openExternal";

/** Atalhos da barra lateral — todos abrem um link em nova aba */
const activityItems = [
  {
    Icon: VscSourceControl,
    link: "https://github.com/MrigortBr/Portfolio",
    title: "Projeto",
  },
  {
    Icon: PiCertificateThin,
    link: "https://github.com/MrigortBr/Portfolio/blob/main/license",
    title: "Licença",
  },
  {
    Icon: BsFileEarmarkArrowDown,
    link: "Curriculo Igor Pereira Lins.pdf",
    title: "Currículo",
  },
];

export default function ActivityBarComponent() {
  return (
    <AcitivityBar>
      {activityItems.map((item) => (
        <IconWrapper
          key={item.title}
          $show
          $Select={false}
          icon={item.Icon}
          title={item.title}
          onClick={() => openExternal(item.link)}
        />
      ))}
    </AcitivityBar>
  );
}
