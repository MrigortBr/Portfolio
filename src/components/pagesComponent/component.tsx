import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import PagesComponent2 from "./component2";
import PagesComponent3 from "./component3";
import { PageContainer } from "./style";
import { Pages } from "@/data/page";

type prop = {
  refs: RefObject<(HTMLDivElement | null)[]>;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

export default function PagesComponent({
  refs,
  pageIndex,
  setPageIndex,
}: prop) {
  const TOTAL_PAGES = Pages.length;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && pageIndex < TOTAL_PAGES - 1) {
      setPageIndex(pageIndex + 1);
    }

    if (e.deltaY < 0 && pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <PageContainer onWheel={(e) => handleWheel(e)}>
      {Pages.map((p, i) => {
        return (
          <p.component
            key={i}
            ref={(el: HTMLDivElement | null) => {
              refs.current[i] = el;
            }}
          />
        );
      })}
    </PageContainer>
  );
}
