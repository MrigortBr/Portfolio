import { useState } from "react";
import { AcitivityBar, IconWrapper, Tooltip } from "./style";
import { VscFile, VscSourceControl } from "react-icons/vsc";
import { FaCode } from "react-icons/fa6";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { PiCertificateThin } from "react-icons/pi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { CiFolderOn } from "react-icons/ci";

const initialActivityItens = [
  {
    Icon: VscFile,
    selected: true,
    title: "Portfólio",
  },
  {
    Icon: FaCode,
    selected: false,
    title: "Código",
  },
  {
    Icon: VscSourceControl,
    selected: false,
    title: "Projeto",
  },
  {
    Icon: MdOutlineChecklistRtl,
    selected: false,
    title: "Todo",
  },
  {
    Icon: PiCertificateThin,
    selected: false,
    title: "Certificado",
  },
  {
    Icon: BsFileEarmarkArrowDown,
    selected: false,
    title: "Curríulo",
  },
  {
    Icon: CiFolderOn,
    selected: false,
    title: "Arquivos",
  },
];

export default function ActivityBarComponent() {
  const [activityItens, setActivityItens] = useState(initialActivityItens);

  function handleSelect(index: number) {
    setActivityItens((prev) =>
      prev.map((item, i) => ({
        ...item,
        selected: i === index,
      }))
    );
  }

  return (
    <AcitivityBar>
      {activityItens.map((ai, i) => {
        return (
          <IconWrapper
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
