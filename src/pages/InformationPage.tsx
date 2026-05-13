import { AppLayout } from "../components/layout";

const InformationPage = () => {
  return (
    <AppLayout activeMenuId="information" showSidebar>
      <div className="mx-auto max-w-[800px]">
        <h1 className="typo-inform-title-section text-text-black">
          산재 정보 작성
        </h1>
        <p className="mt-2 typo-inform-title-caption text-title-gray">
          입력하신 정보를 바탕으로 예상 산재 승인 기간을 안내해드립니다.
        </p>
      </div>
    </AppLayout>
  );
};

export default InformationPage;
