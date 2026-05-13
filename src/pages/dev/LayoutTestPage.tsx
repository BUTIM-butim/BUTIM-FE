import { useState } from "react";
import { Navbar, Sidebar } from "../../components/layout";

const LayoutTestPage = () => {
  const [activeMenuId, setActiveMenuId] = useState("information");
  const [activeSectionId, setActiveSectionId] = useState("industrial-accident");
  const [activeSubItemId, setActiveSubItemId] = useState("basic");

  return (
    <div className="min-h-screen bg-background-blue">
      <Navbar
        activeMenuId={activeMenuId}
        onMenuClick={(menu) => setActiveMenuId(menu.id)}
      />
      <div className="flex">
        <Sidebar
          activeSectionId={activeSectionId}
          activeSubItemId={activeSubItemId}
          onSectionClick={(section) => setActiveSectionId(section.id)}
          onSubItemClick={(section, subItem) => {
            setActiveSectionId(section.id);
            setActiveSubItemId(subItem.id);
          }}
        />
        <main className="flex min-h-[calc(100vh-64px)] flex-1 items-start justify-center px-10 py-20">
          <div className="w-full max-w-[800px] rounded-xl bg-white px-8 py-10 shadow-card-blue">
            <h1 className="typo-inform-title-section text-text-black">
              산재 정보 작성
            </h1>
            <p className="mt-2 typo-inform-title-caption text-title-gray">
              나브바와 사이드바 확인용 dev 페이지입니다.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutTestPage;
