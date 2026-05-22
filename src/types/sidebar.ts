export type SidebarSectionId =
  | "industrialAccident"
  | "prediction"
  | "financial"
  | "strategy";

export type SidebarSubSectionId =
  | "basic"
  | "accident"
  | "work"
  | "additional"
  | "funding"
  | "supportTarget";

export type SidebarStepStatus =
  | "done"
  | "active"
  | "blueActive"
  | "nonActive";

export interface SidebarSubSection {
  id: SidebarSubSectionId;
  title: string;
}

export interface SidebarSection {
  id: SidebarSectionId;
  title: string;
  subSections: SidebarSubSection[];
}

export interface SidebarProps {
  currentSectionId: SidebarSectionId;
  currentSubSectionId?: SidebarSubSectionId;
}