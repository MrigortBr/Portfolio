import PagesComponent3 from "@/components/pagesComponent/component3";
import component2 from "@/components/pagesComponent/component2";
import { ForwardRefExoticComponent, RefAttributes, RefObject } from "react";
import { IconType } from "react-icons";
import { FaReact } from "react-icons/fa";

type page = {
  component: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
  dom: string;
  side: sideItem;
};

type sideItem = {
  title: string;
  type: string;
  icon: IconType;
  color: string;
  selected: boolean;
};

export const Pages: page[] = [
  {
    component: PagesComponent3,
    dom: "PT1",
    side: {
      title: "Test",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
      selected: true,
    },
  },
  {
    component: component2,
    dom: "PT2",
    side: {
      title: "Test 2",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
      selected: false,
    },
  },
];
