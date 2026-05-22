import { useState, useEffect } from 'react';
import type {
  FinancialStep,
  FundStatusData,
  SupportTargetData,
  IncomeLevelEnum,
  EmploymentStatusEnum,
  HouseholdTypeEnum,
} from '../types/financial';
import { financialInfoApi } from '../apis/financialInfo';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import FundStatusForm from '../components/financial/FundStatusForm';
import Button from '../components/common/button/Button';

const initialFundStatus: FundStatusData = {
  currentAssets: '',
  monthlyFixedExpense: '',
  incomeLevel: '',
  currentEmploymentStatus: '',
};

const initialSupportTarget: SupportTargetData = {
  regionId: '',
  householdType: '',
  hasDependent: null,
  hasChild: null,
  childCount: '',
  isPregnant: null,
  hasDisability: null,
  disabilityGrade: '',
};

export default function FinancialInfoPage() {
  const [step, setStep] = useState<FinancialStep>('fund-status');
  const [fundStatus, setFundStatus] = useState<FundStatusData>(initialFundStatus);
  const [supportTarget, setSupportTarget] = useState<SupportTargetData>(initialSupportTarget);
  const [accidentInfoId, setAccidentInfoId] = useState<number | null>(null);
  const [hasExisting, setHasExisting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    financialInfoApi
      .get()
      .then((data) => {
        if (!data) return;
        setHasExisting(true);
        setAccidentInfoId(data.accidentInfoId);
        setFundStatus({
          currentAssets: String(data.currentAssets),
          monthlyFixedExpense: String(data.monthlyFixedExpense),
          incomeLevel: data.incomeLevel,
          currentEmploymentStatus: data.currentEmploymentStatus,
        });
        setSupportTarget({
          regionId: String(data.regionId),
          householdType: data.householdType,
          hasDependent: data.hasDependent,
          hasChild: data.hasChild,
          childCount: data.childCount != null ? String(data.childCount) : '',
          isPregnant: data.isPregnant,
          hasDisability: data.hasDisability,
          disabilityGrade: data.disabilityGrade != null ? String(data.disabilityGrade) : '',
        });
      })
      .catch(() => setError('데이터를 불러오는 데 실패했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    if (step === 'support-target') setStep('fund-status');
  };

  const handleNext = async () => {
    if (step === 'fund-status') {
      setStep('support-target');
      return;
    }

    if (accidentInfoId == null) {
      setError('산재정보를 먼저 입력해주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      accidentInfoId,
      regionId: Number(supportTarget.regionId),
      currentAssets: Number(fundStatus.currentAssets),
      monthlyFixedExpense: Number(fundStatus.monthlyFixedExpense),
      incomeLevel: fundStatus.incomeLevel as IncomeLevelEnum,
      householdType: supportTarget.householdType as HouseholdTypeEnum,
      hasDependent: supportTarget.hasDependent ?? false,
      hasChild: supportTarget.hasChild ?? false,
      childCount: supportTarget.childCount ? Number(supportTarget.childCount) : undefined,
      isPregnant: supportTarget.isPregnant ?? false,
      hasDisability: supportTarget.hasDisability ?? false,
      disabilityGrade: supportTarget.disabilityGrade
        ? Number(supportTarget.disabilityGrade)
        : undefined,
      currentEmploymentStatus: fundStatus.currentEmploymentStatus as EmploymentStatusEnum,
    };

    try {
      if (hasExisting) {
        await financialInfoApi.update(payload);
      } else {
        await financialInfoApi.save(payload);
        setHasExisting(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const isLastStep = step === 'support-target';

  return (
  <div className="min-h-screen bg-background-blue">
    <Header />
    <Sidebar currentSection="financial" currentSubStep={step} />

    <main className="relative ml-[288px] min-h-screen overflow-hidden pt-[64px]">
      {/* 배경 로고 워터마크 */}
      <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
        {/* 일단 임시로 텍스트 말고, 나중에 로고 SVG 컴포넌트 있으면 여기 교체 */}
        <div className="text-[480px] font-bold leading-none bg-logo-gradient bg-clip-text text-transparent">
          버
        </div>
      </div>

      <section className="relative z-10 ml-[125px] pb-[80px] pt-[114px]">
        <div className="mb-[58px]">
          <h1 className="typo-inform-title-section text-text-black">
            재정 정보 작성
          </h1>
          <p className="typo-navbar-button mt-[12px] text-text-gray">
            입력하신 정보를 바탕으로 맞춤 전략을 안내해드립니다.
          </p>
        </div>

        {loading ? (
          <div className="flex h-[300px] w-[800px] items-center justify-center rounded-[12px] bg-white shadow-card-blue">
            <span className="typo-navbar-button text-text-gray">
              불러오는 중...
            </span>
          </div>
        ) : (
          <div className="w-[800px] rounded-[12px] bg-white px-[40px] py-[40px] shadow-card-blue">
            {step === 'fund-status' && (
              <FundStatusForm data={fundStatus} onChange={setFundStatus} />
            )}
          </div>
        )}

        {error && (
          <p className="mt-[12px] typo-warning-text text-warning-red">
            {error}
          </p>
        )}

        <div className="mt-[56px] flex w-[800px] justify-between">
          <Button
            variant="gray"
            size="information"
            hasArrow
            arrowDirection="left"
            disabled={step === 'fund-status' || submitting}
            onClick={handlePrev}
          >
            이전 단계
          </Button>
          <Button
            variant="blue"
            size="information"
            hasArrow
            arrowDirection="right"
            disabled={submitting}
            onClick={handleNext}
          >
            {isLastStep ? '완료' : '다음 단계'}
          </Button>
        </div>
      </section>
    </main>
  </div>
  );
}
