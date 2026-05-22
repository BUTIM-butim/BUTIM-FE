import type { SidebarSection } from "../types/sidebar";

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: "industrialAccident",
    title: "산재 정보 작성",
    subSections: [
      { id: "basic", title: "기본 정보" },
      { id: "accident", title: "사고 정보" },
      { id: "work", title: "근무 정보" },
      { id: "additional", title: "추가 정보" },
    ],
  },
  {
    id: "prediction",
    title: "예측 승인 기간",
    subSections: [],
  },
  {
    id: "financial",
    title: "재정 정보 작성",
    subSections: [
      { id: "funding", title: "자금 상황" },
      { id: "supportTarget", title: "지원 대상 정보" },
    ],
  },
  {
    id: "strategy",
    title: "맞춤 전략 추천",
    subSections: [],
  },
];