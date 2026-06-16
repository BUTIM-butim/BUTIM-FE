import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  AccidentFormData,
  AccidentFormErrors,
  AccidentSubStep,
  DiagnosisCode,
  Industry,
  Job,
} from '../../types/accident';
import type { SidebarSubSectionId } from '../../types/sidebar';
import { accidentApi } from '../../apis/accident';
import { ROUTES } from '../../constants/routes';
import Sidebar from '../../components/layout/Sidebar';
import Button from '../../components/common/button/Button';
import BasicInfoForm from '../../components/accident/BasicInfoForm';
import AccidentForm from '../../components/accident/AccidentForm';
import WorkInfoForm from '../../components/accident/WorkInfoForm';
import AdditionalInfoForm from '../../components/accident/AdditionalInfoForm';

const initialFormData: AccidentFormData = {
  age: '',
  gender: '',
  accidentDate: '',
  symptomInput: '',
  diagnosisCodeSelection: '',
  industryId: null,
  industryName: '',
  jobId: null,
  jobName: '',
  businessSize: '',
  employmentType: '',
  additionalInfo: '',
};

const SIDEBAR_SUB_SECTION_MAP: Record<AccidentSubStep, SidebarSubSectionId> = {
  basic: 'basic',
  accident: 'accident',
  work: 'work',
  additional: 'additional',
};

export default function AccidentInfoPage() {
  const navigate = useNavigate();

  const [subStep, setSubStep] = useState<AccidentSubStep>('basic');
  const [accidentScreen, setAccidentScreen] = useState<'input' | 'select'>(
    'input',
  );
  const [formData, setFormData] = useState<AccidentFormData>(initialFormData);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<DiagnosisCode[]>([]);
  const [suggesting, setSuggesting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<AccidentFormErrors>({});

  useEffect(() => {
    accidentApi.getIndustries().then(setIndustries).catch((e) => console.error('industries error:', e));
    accidentApi.getJobs().then(setJobs).catch((e) => console.error('jobs error:', e));
  }, []);

  const isFirstScreen = subStep === 'basic';
  const isLastScreen = subStep === 'additional';
  const nextButtonText = isLastScreen ? '완료' : '다음 단계';

  const handlePrev = () => {
    setError(null);
    setErrors({});

    if (subStep === 'accident' && accidentScreen === 'select') {
      setAccidentScreen('input');
      return;
    }
    if (subStep === 'accident') {
      setSubStep('basic');
      return;
    }
    if (subStep === 'work') {
      setSubStep('accident');
      setAccidentScreen('select');
      return;
    }
    if (subStep === 'additional') {
      setSubStep('work');
    }
  };

  const handleConfirm = async () => {
    const newErrors: AccidentFormErrors = {};
    if (!formData.accidentDate) newErrors.accidentDate = true;
    if (!formData.symptomInput.trim()) newErrors.symptomInput = true;

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setError('입력하지 않은 항목을 확인해주세요.');
      return;
    }

    setErrors({});
    setError(null);
    setSuggesting(true);

    try {
      const codes = await accidentApi.suggestDiagnosisCodes(
        formData.symptomInput,
      );
      setDiagnosisCodes(codes);
      setFormData((prev) => ({ ...prev, diagnosisCodeSelection: '' }));
      setAccidentScreen('select');
    } catch {
      setError('상병명 조회에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSuggesting(false);
    }
  };

  const handleNext = async () => {
    setError(null);

    if (subStep === 'basic') {
      const newErrors: AccidentFormErrors = {};
      if (!formData.age) newErrors.age = true;
      if (!formData.gender) newErrors.gender = true;

      if (Object.values(newErrors).some(Boolean)) {
        setErrors(newErrors);
        setError('입력하지 않은 항목을 확인해주세요.');
        return;
      }

      setErrors({});
      setSubStep('accident');
      setAccidentScreen('input');
      return;
    }

    if (subStep === 'accident' && accidentScreen === 'input') {
      await handleConfirm();
      return;
    }

    if (subStep === 'accident' && accidentScreen === 'select') {
      if (!formData.diagnosisCodeSelection) {
        setErrors({ diagnosisCodeSelection: true });
        setError('상병명을 선택해주세요.');
        return;
      }

      setErrors({});
      setSubStep('work');
      return;
    }

    if (subStep === 'work') {
      const newErrors: AccidentFormErrors = {};
      if (!formData.industryId) newErrors.industryId = true;
      if (!formData.jobId) newErrors.jobId = true;
      if (!formData.businessSize) newErrors.businessSize = true;
      if (!formData.employmentType) newErrors.employmentType = true;

      if (Object.values(newErrors).some(Boolean)) {
        setErrors(newErrors);
        setError('입력하지 않은 항목을 확인해주세요.');
        return;
      }

      setErrors({});
      setSubStep('additional');
      return;
    }

    if (subStep === 'additional') {
      setSubmitting(true);

      const diagnosisCodeId =
        formData.diagnosisCodeSelection === 'unknown'
          ? null
          : formData.diagnosisCodeSelection
            ? Number(formData.diagnosisCodeSelection)
            : null;

      try {
        await accidentApi.submit({
          age: Number(formData.age),
          gender: formData.gender as string,
          accidentDate: formData.accidentDate,
          diagnosisCodeId,
          industryId: formData.industryId!,
          jobId: formData.jobId!,
          businessSize: formData.businessSize as string,
          employmentType: formData.employmentType as string,
          additionalInfo: formData.additionalInfo,
        });

        navigate(ROUTES.PERIOD);
      } catch (e) {
        setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-blue">
      <Sidebar
        currentSectionId="industrialAccident"
        currentSubSectionId={SIDEBAR_SUB_SECTION_MAP[subStep]}
      />

      <main className="relative ml-[288px] min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
          <div className="bg-logo-gradient bg-clip-text text-[480px] font-bold leading-none text-transparent">
            버
          </div>
        </div>

        <section className="relative z-10 ml-[125px] pb-[80px] pt-[114px]">
          <div className="mb-[58px]">
            <h1 className="typo-inform-title-section text-text-black">
              산재 정보 작성
            </h1>
            <p className="typo-navbar-button mt-[12px] text-text-gray">
              입력하신 정보를 바탕으로 예상 산재 승인 기간을 안내해드립니다.
            </p>
          </div>

          <div className="w-[800px] rounded-[12px] bg-white px-[32px] pb-[50px] pt-[40px] shadow-card-blue">
            {subStep === 'basic' && (
              <BasicInfoForm
                data={formData}
                errors={errors}
                onChange={setFormData}
              />
            )}

            {subStep === 'accident' && (
              <AccidentForm
                data={formData}
                errors={errors}
                screen={accidentScreen}
                diagnosisCodes={diagnosisCodes}
                suggesting={suggesting}
                onChange={(next) => {
                  setFormData(next);
                  setErrors({});
                  setError(null);
                }}
                onConfirm={handleConfirm}
              />
            )}

            {subStep === 'work' && (
              <WorkInfoForm
                data={formData}
                errors={errors}
                industries={industries}
                jobs={jobs}
                onChange={(next) => {
                  setFormData(next);
                  setErrors({});
                  setError(null);
                }}
              />
            )}

            {subStep === 'additional' && (
              <AdditionalInfoForm data={formData} onChange={setFormData} />
            )}
          </div>

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
              disabled={isFirstScreen || submitting || suggesting}
              onClick={handlePrev}
            >
              이전 단계
            </Button>

            <Button
              variant="blue"
              size="information"
              hasArrow
              arrowDirection="right"
              disabled={submitting || suggesting}
              onClick={handleNext}
            >
              {submitting || suggesting ? '처리 중...' : nextButtonText}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
