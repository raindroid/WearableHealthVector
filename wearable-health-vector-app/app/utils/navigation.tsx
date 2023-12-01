"use client";

import { IconType } from "react-icons/lib";
import { MdDataThresholding, MdSchema } from "react-icons/md";
import {
  PiCodesandboxLogoFill,
  PiFileCsvFill,
  PiPlugsConnectedFill,
} from "react-icons/pi";
import { RiSpeakFill, RiTableFill } from "react-icons/ri";

export interface LinkType {
  title: any;
  href: string;
  icon: IconType;
}

export const links: { [name: string]: LinkType } = {
  connectors: {
    title: "Connectors",
    href: "/connectors",
    icon: PiPlugsConnectedFill,
  },
  schemas: {
    title: "Schemas",
    href: "/schemas",
    icon: MdSchema,
  },
  table: {
    title: "Tables",
    href: "/table",
    icon: RiTableFill,
  },
  playground: {
    title: "Playground",
    href: "/playground",
    icon: PiCodesandboxLogoFill,
  },
  csvquery: {
    title: "CSV Query",
    href: "/csvquery",
    icon: PiFileCsvFill,
  },
  sqlexplain: {
    title: "SQL Explained",
    href: "/sqlexplain",
    icon: RiSpeakFill,
  },
  datavis: {
    title: "Data Visualization",
    href: "/datavis",
    icon: MdDataThresholding,
  },
};

const paths: { matchPaths: any; navigation: LinkType[] }[] = [
  { matchPaths: ["/connectors"], navigation: [links.connectors] },
  { matchPaths: ["/schemas"], navigation: [links.schemas] },
  { matchPaths: ["/table"], navigation: [links.table] },
  { matchPaths: ["/playground"], navigation: [links.playground] },
  { matchPaths: ["/csvquery"], navigation: [links.csvquery] },
  { matchPaths: ["/sqlexplain"], navigation: [links.sqlexplain] },
  { matchPaths: ["/datavis"], navigation: [links.datavis] },
];

export function getPurePath(pathname: string, lang: string = ""): string {
  if (pathname.indexOf(lang) !== 1) return pathname;
  return pathname.substring(lang.length + 1);
}

export function getRoutes(
  pathname: string | null,
  lang: string = ""
): LinkType[] | null {
  if (pathname === null) return null;

  const purePath = getPurePath(pathname, lang);
  for (let path of paths) {
    const { matchPaths, navigation } = path;
    for (let matchPath of matchPaths) {
      if (matchPath === purePath || matchPath + "/" === purePath) {
        return navigation;
      }
    }
  }
  return null;
}
