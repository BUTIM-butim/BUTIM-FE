import type { NavbarMenuItem, SidebarSection } from "../types/layout";
import { ROUTES } from "./routes";

export const NAVBAR_MENUS: NavbarMenuItem[] = [
  { id: "information", label: "정보 입력", href: ROUTES.INFORMATION },
  { id: "period", label: "예상 기간", href: ROUTES.PERIOD },
  { id: "strategy", label: "맞춤 전략", href: ROUTES.STRATEGY },
];

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: "industrial-accident",
    label: "산재 정보 작성",
    step: 1,
    subItems: [
      { id: "basic", label: "기본 정보" },
      { id: "accident", label: "사고 정보" },
      { id: "work", label: "근무 정보" },
      { id: "additional", label: "추가 정보" },
    ],
  },
  { id: "approval-period", label: "예측 승인 기간", step: 2 },
  { id: "finance", label: "재정 정보 작성", step: 3 },
  { id: "strategy", label: "맞춤 전략 추천", step: 4 },
];
