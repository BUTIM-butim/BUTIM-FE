import type { ComponentPropsWithoutRef } from "react";

export type NavbarMenuItem = {
  id: string;
  label: string;
  href?: string;
};

export type NavbarProps = ComponentPropsWithoutRef<"header"> & {
  menus?: NavbarMenuItem[];
  activeMenuId?: string;
  isLoggedIn?: boolean;
  userName?: string;
  hasNotification?: boolean;
  onMenuClick?: (menu: NavbarMenuItem) => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
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
