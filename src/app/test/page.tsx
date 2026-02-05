"use client";

import VisualHeaderComponent from "@/components/header/component";
import { VisualMain } from "./style";
import ActivityBarComponent from "@/components/ActivityBar/component";
import SideBarComponent from "@/components/SideBar/component";
import FileBar from "@/components/FileBar/component";
import FooterComponent from "@/components/Footer/component";
import PagesComponent from "@/components/pagesComponent/component";
import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/pagesComponent/style";
import { Pages } from "@/data/page";

export default function Index() {
  const [pageIndex, setpageIndex] = useState(0);
  const refSystem = useRef<(HTMLDivElement | null)[]>([null, null]);

  useEffect(() => {
    if (refSystem.current[pageIndex]) {
      refSystem.current[pageIndex].scrollIntoView({ behavior: "smooth" });
    }
  }, [pageIndex]);

  return (
    <VisualMain>
      <VisualHeaderComponent />
      <ActivityBarComponent />
      <SideBarComponent pageIndex={pageIndex} setPageIndex={setpageIndex} />
      <FileBar />
      <PagesComponent
        refs={refSystem}
        pageIndex={pageIndex}
        setPageIndex={setpageIndex}
      />
      <FooterComponent />
    </VisualMain>
  );
}
