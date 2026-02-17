import {
  RefObject,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
} from "react";
import { FileContainer, FileTitle, FileWrapper } from "./style";
import { FaReact } from "react-icons/fa";
import { Pages, sideItem } from "@/data/page";

type prop = {
  pageIndex: number;
};

export default function FileBarComponent({ pageIndex }: prop) {
  const file = useMemo(() => {
    return Pages[pageIndex]?.side ?? null;
  }, [pageIndex]);

  return (
    <FileContainer>
      <FileWrapper>
        <file.icon color={file.color} />
        <FileTitle>
          {file.title}.{file.type}
        </FileTitle>
      </FileWrapper>
    </FileContainer>
  );
}
