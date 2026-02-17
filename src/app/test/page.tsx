"use client";

import { useEffect, useRef, useState } from "react";
import VisualHeaderComponent from "@/components/header/component";
import { VisualMain } from "./style";
import ActivityBarComponent from "@/components/ActivityBar/component";
import SideBarComponent from "@/components/SideBar/component";
import FileBar from "@/components/FileBar/component";
import FooterComponent from "@/components/Footer/component";
import PagesComponent from "@/components/pagesComponent/component";
import { Pages } from "@/data/page";
import LoadingComponent from "@/components/spinnerLoading/component";

export default function Index() {
  const [pageIndex, setpageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const refSystem = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    Pages.map(() => refSystem.current.push(null));
    const update = () => {
      setIsMounted(true);
    };
    update();
  }, []);

  useEffect(() => {
    if (refSystem.current[pageIndex]) {
      refSystem.current[pageIndex].scrollIntoView({ behavior: "smooth" });
    }
  }, [pageIndex]);

  if (!isMounted) return <LoadingComponent></LoadingComponent>;

  return (
    <VisualMain>
      <VisualHeaderComponent />
      <ActivityBarComponent />
      <SideBarComponent pageIndex={pageIndex} setPageIndex={setpageIndex} />
      <FileBar pageIndex={pageIndex} />
      <PagesComponent
        refs={refSystem}
        pageIndex={pageIndex}
        setPageIndex={setpageIndex}
      />
      <FooterComponent />
    </VisualMain>
  );
}
