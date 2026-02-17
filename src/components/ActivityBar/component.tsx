import { useState } from "react";
import { AcitivityBar, IconWrapper, Tooltip } from "./style";
import { VscFile, VscSourceControl } from "react-icons/vsc";
import { FaCode } from "react-icons/fa6";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { PiCertificateThin } from "react-icons/pi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { CiFolderOn } from "react-icons/ci";

enum initialActivity {
  OPENLINK,
  SWITCHPAGE,
}

const initialActivityItens = [
  {
    Icon: VscFile,
    selected: true,
    type: initialActivity.SWITCHPAGE,
    principalInMobile: false,
    title: "Portfólio",
  },
  {
    Icon: FaCode,
    selected: false,
    type: initialActivity.SWITCHPAGE,
    principalInMobile: false,
    title: "Código",
  },
  {
    Icon: VscSourceControl,
    selected: false,
    type: initialActivity.OPENLINK,
    link: "https://github.com/MrigortBr/Portfolio",
    principalInMobile: true,
    title: "Projeto",
  },
  {
    Icon: MdOutlineChecklistRtl,
    selected: false,
    type: initialActivity.SWITCHPAGE,
    principalInMobile: false,
    title: "Todo",
  },
  {
    Icon: PiCertificateThin,
    selected: false,
    type: initialActivity.OPENLINK,
    link: "https://github.com/MrigortBr/Portfolio/blob/main/LICENCE",
    principalInMobile: true,
    title: "Certificado",
  },
  {
    Icon: BsFileEarmarkArrowDown,
    selected: false,
    type: initialActivity.OPENLINK,
    link: "Curriculo Igor Pereira Lins.pdf",
    principalInMobile: true,
    title: "Curríulo",
  },
  {
    Icon: CiFolderOn,
    selected: false,
    type: initialActivity.SWITCHPAGE,
    principalInMobile: false,
    title: "Arquivos",
  },
];

export default function ActivityBarComponent() {
  const [activityItens, setActivityItens] = useState(initialActivityItens);

  function handleSelect(index: number) {
    if (initialActivityItens[index].type == initialActivity.SWITCHPAGE) {
      setActivityItens((prev) =>
        prev.map((item, i) => ({
          ...item,
          selected: i === index,
        }))
      );
    } else if (initialActivityItens[index].type == initialActivity.OPENLINK) {
      window.open(initialActivityItens[index].link, "_blank");
    }
  }

  return (
    <AcitivityBar>
      {activityItens.map((ai, i) => {
        return (
          <IconWrapper
            $show={ai.principalInMobile}
            key={i}
            icon={ai.Icon}
            $Select={ai.selected}
            onClick={() => handleSelect(i)}
            title={ai.title}
          ></IconWrapper>
        );
      })}
      {/* <CustomIcon icon={VscSearch}></CustomIcon> */}
    </AcitivityBar>
  );
}
