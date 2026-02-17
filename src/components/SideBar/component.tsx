import {
  FileItem,
  FilesList,
  FolderTitle,
  FolderWrapper,
  SideBar,
  TitleSideBar,
} from "./style";
import { VscChevronDown } from "react-icons/vsc";
import { FaReact } from "react-icons/fa";
import { IconWrapper } from "../ActivityBar/style";
import { Pages } from "@/data/page";
import { Dispatch, SetStateAction } from "react";

type prop = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

export default function SideBarComponent({ pageIndex, setPageIndex }: prop) {
  return (
    <SideBar>
      <TitleSideBar>EXPLORER</TitleSideBar>
      <FolderWrapper>
        <VscChevronDown />
        <FolderTitle>Tópicos</FolderTitle>
      </FolderWrapper>
      <FilesList>
        {Pages.map((ai, i) => {
          return (
            <FileItem
              key={i}
              $selected={i == pageIndex}
              onClick={() => {
                setPageIndex(i);
              }}
            >
              <ai.side.icon color={ai.side.color} />
              {ai.side.title}.{ai.side.type}
            </FileItem>
          );
        })}
      </FilesList>
    </SideBar>
  );
}
