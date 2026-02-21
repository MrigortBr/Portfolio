import ProjectComponent from "@/components/projects/component";
import AboutMeComponent from "@/components/aboutme/component";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";
import { IconType } from "react-icons";
import { FaReact } from "react-icons/fa";
import HelloComponent from "@/components/Hello/component";
import CertificatesComponent from "@/components/certificates/component";
import ThankYouComponent from "@/components/thankyou/component";
import StacksComponent from "@/components/stacks/component";
type page = {
  component: ForwardRefExoticComponent<
    {
      setPageIndex: Dispatch<SetStateAction<number>>;
    } & RefAttributes<HTMLDivElement>
  >;
  dom: string;
  side: sideItem;
};

export type sideItem = {
  title: string;
  type: string;
  icon: IconType;
  color: string;
};

export const Pages: page[] = [
  {
    component: HelloComponent,
    dom: "Hello",
    side: {
      title: "Olá",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
  {
    component: AboutMeComponent,
    dom: "About",
    side: {
      title: "Sobre mim",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
  {
    component: ProjectComponent,
    dom: "projetos",
    side: {
      title: "Projetos",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
  {
    component: StacksComponent,
    dom: "stack",
    side: {
      title: "Competências",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
  {
    component: CertificatesComponent,
    dom: "certificados",
    side: {
      title: "Certificados",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
  {
    component: ThankYouComponent,
    dom: "Obrigado",
    side: {
      title: "Obrigado",
      type: "tsx",
      icon: FaReact,
      color: "#00DBFF",
    },
  },
];
