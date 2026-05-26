import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  FinancialStep,
  FundStatusData,
  SupportTargetData,
  IncomeLevelEnum,
  EmploymentStatusEnum,
  HouseholdTypeEnum,
  DependentTypeEnum,
} from '../../types/financial';
import { financialInfoApi } from '../../apis/financialInfo';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import FundStatusForm from '../../components/financial/FundStatusForm';
import SupportTargetForm from '../../components/financial/SupportTargetForm';
import Button from '../../components/common/button/Button';

type SupportTargetStep = 'basic' | 'dependent';

type InputProgress = {
  lastPath?: string;
  financialStep?: FinancialStep;
  supportTargetStep?: SupportTargetStep;
  hasAccidentInfo?: boolean;
  hasFinancialInfo?: boolean;
};

const INPUT_PROGRESS_STORAGE_KEY = 'butim-input-progress';

const initialFundStatus: FundStatusData = {
  currentAssets: '',
  monthlyFixedExpense: '',
  incomeLevel: '',
  currentEmploymentStatus: '',
};

const initialSupportTarget: SupportTargetData = {
  regionId: '',
  regionName: '',

  householdType: '',

  householdMemberCount: '',

  hasDependent: null,
  dependentCount: '',
  dependentType: '',

  hasChild: null,

  isPregnant: null,

  hasDisability: null,
};

type FundStatusErrors = Partial<Record<keyof FundStatusData, boolean>>;
type SupportTargetErrors = Partial<Record<keyof SupportTargetData, boolean>>;

const removeComma = (value: string) => value.replaceAll(',', '').trim();

const getInputProgress = (): InputProgress | null => {
  const raw = localStorage.getItem(INPUT_PROGRESS_STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as InputProgress;
  } catch {
    return null;
  }
};

const saveInputProgress = (progress: InputProgress) => {
  const prev = getInputProgress();

  localStorage.setItem(
    INPUT_PROGRESS_STORAGE_KEY,
    JSON.stringify({
      ...prev,
      ...progress,
    }),
  );
};

const getInitialFinancialStep = (): FinancialStep => {
  const progress = getInputProgress();

  return progress?.financialStep ?? 'fund-status';
};

const getInitialSupportTargetStep = (): SupportTargetStep => {
  const progress = getInputProgress();

  return progress?.supportTargetStep ?? 'basic';
};

export default function FinancialInfoPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<FinancialStep>(getInitialFinancialStep);
  const [supportTargetStep, setSupportTargetStep] =
    useState<SupportTargetStep>(getInitialSupportTargetStep);

  const [fundStatus, setFundStatus] =
    useState<FundStatusData>(initialFundStatus);

  const [supportTarget, setSupportTarget] =
    useState<SupportTargetData>(initialSupportTarget);

  const [fundStatusErrors, setFundStatusErrors] =
    useState<FundStatusErrors>({});

  const [supportTargetErrors, setSupportTargetErrors] =
    useState<SupportTargetErrors>({});

  const [accidentInfoId, setAccidentInfoId] = useState<number | null>(null);
  const [hasExisting, setHasExisting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveInputProgress({
      lastPath: '/financial',
      financialStep: step,
      supportTargetStep,
      hasFinancialInfo: false,
    });
  }, [step, supportTargetStep]);

  useEffect(() => {
    financialInfoApi
      .get()
      .then((data) => {
        if (!data) return;

        setHasExisting(true);
        setAccidentInfoId(data.accidentInfoId);

        setFundStatus({
          currentAssets: String(data.currentAssets ?? ''),
          monthlyFixedExpense: String(data.monthlyFixedExpense ?? ''),
          incomeLevel: data.incomeLevel ?? '',
          currentEmploymentStatus: data.currentEmploymentStatus ?? '',
        });

        setSupportTarget({
          regionId: data.regionId != null ? String(data.regionId) : '',
          regionName: data.regionName ?? '',

          householdType: data.householdType ?? '',

          householdMemberCount:
            data.householdMemberCount != null
              ? String(data.householdMemberCount)
              : '',

          hasDependent: data.hasDependent ?? null,
          dependentCount:
            data.dependentCount != null ? String(data.dependentCount) : '',
          dependentType: data.dependentType ?? '',

          hasChild: data.hasChild ?? null,

          isPregnant: data.isPregnant ?? null,

          hasDisability: data.hasDisability ?? null,
        });

        saveInputProgress({
          lastPath: '/financial',
          financialStep: 'fund-status',
          supportTargetStep: 'basic',
          hasFinancialInfo: true,
        });
      })
      .catch(() => {
        setHasExisting(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const validateFundStatus = () => {
    const errors: FundStatusErrors = {
      currentAssets: !removeComma(fundStatus.currentAssets),
      monthlyFixedExpense: !removeComma(fundStatus.monthlyFixedExpense),
      incomeLevel: !fundStatus.incomeLevel,
      currentEmploymentStatus: !fundStatus.currentEmploymentStatus,
    };

    setFundStatusErrors(errors);

    return !Object.values(errors).some(Boolean);
  };

  const validateSupportTargetBasic = () => {
    const errors: SupportTargetErrors = {
      regionId: !supportTarget.regionId,
      householdType: !supportTarget.householdType,
      isPregnant: supportTarget.isPregnant === null,
      hasDisability: supportTarget.hasDisability === null,
    };

    setSupportTargetErrors(errors);

    return !Object.values(errors).some(Boolean);
  };

  const validateSupportTargetDependent = () => {
    const errors: SupportTargetErrors = {
      householdMemberCount: !removeComma(supportTarget.householdMemberCount),
      hasDependent: supportTarget.hasDependent === null,
    };

    if (supportTarget.hasDependent === true) {
      errors.dependentCount = !removeComma(supportTarget.dependentCount);
      errors.dependentType = !supportTarget.dependentType;

      if (supportTarget.dependentType === 'CHILD') {
        errors.hasChild = supportTarget.hasChild === null;
      }
    }

    setSupportTargetErrors(errors);

    return !Object.values(errors).some(Boolean);
  };

  const handlePrev = () => {
    setError(null);

    if (step === 'support-target' && supportTargetStep === 'dependent') {
      setSupportTargetStep('basic');
      setSupportTargetErrors({});

      saveInputProgress({
        lastPath: '/financial',
        financialStep: 'support-target',
        supportTargetStep: 'basic',
      });

      return;
    }

    if (step === 'support-target' && supportTargetStep === 'basic') {
      setStep('fund-status');
      setSupportTargetErrors({});

      saveInputProgress({
        lastPath: '/financial',
        financialStep: 'fund-status',
        supportTargetStep: 'basic',
      });
    }
  };

  const handleNext = async () => {
    setError(null);

    if (step === 'fund-status') {
      const isValid = validateFundStatus();

      if (!isValid) {
        setError('입력하지 않은 항목을 확인해주세요.');
        return;
      }

      setFundStatusErrors({});
      setStep('support-target');
      setSupportTargetStep('basic');

      saveInputProgress({
        lastPath: '/financial',
        financialStep: 'support-target',
        supportTargetStep: 'basic',
      });

      return;
    }

    if (step === 'support-target' && supportTargetStep === 'basic') {
      const isValid = validateSupportTargetBasic();

      if (!isValid) {
        setError('입력하지 않은 항목을 확인해주세요.');
        return;
      }

      setSupportTargetErrors({});
      setSupportTargetStep('dependent');

      saveInputProgress({
        lastPath: '/financial',
        financialStep: 'support-target',
        supportTargetStep: 'dependent',
      });

      return;
    }

    const isValid = validateSupportTargetDependent();

    if (!isValid) {
      setError('입력하지 않은 항목을 확인해주세요.');
      return;
    }

    if (accidentInfoId == null) {
      setError('산재정보를 먼저 입력해주세요.');
      return;
    }

    setSubmitting(true);

    const payload = {
      accidentInfoId,
      regionId: Number(supportTarget.regionId),
      currentAssets: Number(removeComma(fundStatus.currentAssets)),
      monthlyFixedExpense: Number(removeComma(fundStatus.monthlyFixedExpense)),
      incomeLevel: fundStatus.incomeLevel as IncomeLevelEnum,
      householdType: supportTarget.householdType as HouseholdTypeEnum,

      householdMemberCount: Number(
        removeComma(supportTarget.householdMemberCount),
      ),

      hasDependent: supportTarget.hasDependent ?? false,

      dependentCount:
        supportTarget.hasDependent === true && supportTarget.dependentCount
          ? Number(removeComma(supportTarget.dependentCount))
          : undefined,

      dependentType:
        supportTarget.hasDependent === true && supportTarget.dependentType
          ? (supportTarget.dependentType as DependentTypeEnum)
          : undefined,

      hasChild:
        supportTarget.hasDependent === true &&
        supportTarget.dependentType === 'CHILD'
          ? supportTarget.hasChild ?? false
          : false,

      isPregnant: supportTarget.isPregnant ?? false,

      hasDisability: supportTarget.hasDisability ?? false,

      currentEmploymentStatus:
        fundStatus.currentEmploymentStatus as EmploymentStatusEnum,
    };

    try {
      if (hasExisting) {
        await financialInfoApi.update(payload);
      } else {
        await financialInfoApi.save(payload);
        setHasExisting(true);
      }

      saveInputProgress({
        lastPath: '/strategy/recommend',
        financialStep: 'support-target',
        supportTargetStep: 'dependent',
        hasFinancialInfo: true,
      });

      setSupportTargetErrors({});
      setError(null);

      navigate('/strategy/recommend');
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const buttonText =
    step === 'support-target' && supportTargetStep === 'dependent'
      ? '완료'
      : '다음 단계';

  return (
    <div className="min-h-screen bg-background-blue">
      <Header />

      <Sidebar currentSection="financial" currentStep={step} />

      <main className="relative ml-[288px] min-h-screen overflow-hidden pt-[64px]">
        <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
          <div className="bg-logo-gradient bg-clip-text text-[480px] font-bold leading-none text-transparent">
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
            <div className="w-[800px] rounded-[12px] bg-white px-[32px] pb-[50px] pt-[40px] shadow-card-blue">
              {step === 'fund-status' && (
                <FundStatusForm
                  data={fundStatus}
                  errors={fundStatusErrors}
                  onChange={(nextData) => {
                    setFundStatus(nextData);
                    setFundStatusErrors({});
                    setError(null);
                  }}
                />
              )}

              {step === 'support-target' && (
                <SupportTargetForm
                  data={supportTarget}
                  step={supportTargetStep}
                  errors={supportTargetErrors}
                  onChange={(nextData) => {
                    setSupportTarget(nextData);
                    setSupportTargetErrors({});
                    setError(null);
                  }}
                />
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
              disabled={
                (step === 'fund-status' && supportTargetStep === 'basic') ||
                submitting
              }
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
              {buttonText}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}