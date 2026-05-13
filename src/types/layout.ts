import type { ComponentPropsWithoutRef } from "react";

export type NavbarMenuItem = {
  id: string;
  label: string;
  href?: string;
};

export type NavbarProps = ComponentPropsWithoutRef<"header"> & {
  menus?: NavbarMenuItem[];
  activeMenuId?: string;
  userName?: string;
  onMenuClick?: (menu: NavbarMenuItem) => void;
};

export type SidebarSubItem = {
  id: string;
  label: string;
};

export type SidebarSection = {
  id: string;
  label: string;
  step: number;
  subItems?: SidebarSubItem[];
};

export type SidebarProps = ComponentPropsWithoutRef<"aside"> & {
  sections?: SidebarSection[];
  activeSectionId?: string;
  activeSubItemId?: string;
  onSectionClick?: (section: SidebarSection) => void;
  onSubItemClick?: (section: SidebarSection, subItem: SidebarSubItem) => void;
};
