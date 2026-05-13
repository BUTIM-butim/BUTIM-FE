import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type AppLayoutProps = {
  activeMenuId?: string;
  showSidebar?: boolean;
  children: ReactNode;
};

const AppLayout = ({
  activeMenuId = "",
  showSidebar = false,
  children,
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background-blue">
      <Navbar activeMenuId={activeMenuId} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="min-h-[calc(100vh-64px)] flex-1 px-10 py-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
