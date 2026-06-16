import { useState, useMemo } from 'react';
import type {
  AccidentFormData,
  AccidentFormErrors,
  Industry,
  Job,
  BusinessSizeEnum,
  EmploymentTypeEnum,
} from '../../types/accident';
import InformationHalf1Input from '../common/input/InformationHalf1Input';
import InformationHalf2Input from '../common/input/InformationHalf2Input';
import InformationOptionField from '../common/option/InformationOptionField';
import DimOverlay from '../common/overlay/DimOverlay';
import Button from '../common/button/Button';
import CloseIcon from '../common/icons/CloseIcon';

const BUSINESS_SIZE_OPTIONS: { label: string; value: BusinessSizeEnum }[] = [
  { label: '5인 미만', value: 'UNDER_5' },
  { label: '5~9인', value: 'FROM_5_TO_9' },
  { label: '10~29인', value: 'FROM_10_TO_29' },
  { label: '30~49인', value: 'FROM_30_TO_49' },
  { label: '50~99인', value: 'FROM_50_TO_99' },
  { label: '100~299인', value: 'FROM_100_TO_299' },
  { label: '300~499인', value: 'FROM_300_TO_499' },
  { label: '500~999인', value: 'FROM_500_TO_999' },
  { label: '1,000인 이상', value: 'OVER_1000' },
];

const EMPLOYMENT_TYPE_OPTIONS: { label: string; value: EmploymentTypeEnum }[] =
  [
    { label: '정규직', value: 'REGULAR' },
    { label: '계약직 (기간제 포함)', value: 'CONTRACT' },
    { label: '일용직 (하루 단위 근로)', value: 'DAILY' },
    { label: '특수형태근로종사자', value: 'SPECIAL' },
    { label: '잘 모르겠어요', value: 'UNKNOWN' },
  ];

const JOB_CATEGORIES = [
  { prefix: '1', label: '관리자' },
  { prefix: '2', label: '전문가 및 관련종사자' },
  { prefix: '3', label: '사무 종사자' },
  { prefix: '4', label: '서비스 종사자' },
  { prefix: '5', label: '판매 종사자' },
  { prefix: '6', label: '농림어업' },
  { prefix: '7', label: '기능원' },
  { prefix: '8', label: '기계조작 및 조립' },
  { prefix: '9', label: '단순노무' },
  { prefix: 'A', label: '군인' },
  { prefix: 'S', label: '특수형태근로' },
  { prefix: 'N', label: '노무제공자' },
  { prefix: 'L', label: '학생연구자' },
];

type Props = {
  data: AccidentFormData;
  errors: AccidentFormErrors;
  industries: Industry[];
  jobs: Job[];
  onChange: (data: AccidentFormData) => void;
};

function IndustrySelectModal({
  open,
  industries,
  onClose,
  onConfirm,
}: {
  open: boolean;
  industries: Industry[];
  onClose: () => void;
  onConfirm: (industry: Industry) => void;
}) {
  const [selected, setSelected] = useState<Industry | null>(null);

  if (!open) return null;

  return (
    <DimOverlay>
      <div className="flex h-[520px] w-[680px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0px_0px_24px_2px_rgba(31,41,55,0.12)]">
        <div className="flex items-center justify-between px-[28px] pt-[26px] pb-[20px]">
          <h2 className="typo-inform-sub-section text-text-black">업종 선택</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[28px]">
          <div className="flex flex-wrap gap-[12px] pb-[20px]">
            {industries.map((industry) => {
              const isSelected =
                selected?.industryId === industry.industryId;
              return (
                <button
                  key={industry.industryId}
                  type="button"
                  onClick={() => setSelected(industry)}
                  className={`h-[47px] min-w-[140px] rounded-[10px] border px-[16px] typo-navbar-button transition-colors ${
                    isSelected
                      ? 'border-button-blue bg-blue-50 text-button-blue'
                      : 'border-line-gray bg-white text-text-black hover:border-button-blue'
                  }`}
                >
                  {industry.industryName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-[12px] border-t border-line-gray px-[28px] py-[20px]">
          <Button variant="gray" size="popup" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="blue"
            size="popup"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onConfirm(selected);
                setSelected(null);
              }
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </DimOverlay>
  );
}

function JobSelectModal({
  open,
  jobs,
  onClose,
  onConfirm,
}: {
  open: boolean;
  jobs: Job[];
  onClose: () => void;
  onConfirm: (job: Job) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    JOB_CATEGORIES[0].prefix,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Job | null>(null);

  const categoryJobs = useMemo(() => {
    const base = jobs.filter((j) =>
      j.jobCode.startsWith(selectedCategory),
    );
    if (!searchQuery.trim()) return base;
    return base.filter((j) =>
      j.jobName.includes(searchQuery.trim()),
    );
  }, [jobs, selectedCategory, searchQuery]);

  if (!open) return null;

  const selectedCategoryLabel =
    JOB_CATEGORIES.find((c) => c.prefix === selectedCategory)?.label ?? '';

  return (
    <DimOverlay>
      <div className="flex h-[520px] w-[723px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0px_0px_24px_2px_rgba(31,41,55,0.12)]">
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel: categories */}
          <aside className="w-[196px] shrink-0 border-r border-line-gray">
            <div className="h-[79px] px-[26px] pt-[26px]">
              <h2 className="typo-inform-sub-section text-text-black">
                직종 선택
              </h2>
            </div>
            <div className="h-[calc(100%-79px)] overflow-y-auto">
              {JOB_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.prefix;
                return (
                  <button
                    key={cat.prefix}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.prefix);
                      setSearchQuery('');
                      setSelected(null);
                    }}
                    className={`flex w-full items-center px-[24px] py-[14px] typo-option-list-caption text-left transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-button-blue font-semibold'
                        : 'text-text-black hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right panel: jobs */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="px-[20px] pt-[20px] pb-[14px]">
              <p className="typo-option-list-caption text-text-gray mb-[10px]">
                {selectedCategoryLabel}
              </p>
              <div className="flex h-[40px] w-full items-center rounded-[8px] border border-line-gray bg-white px-[12px] gap-[8px]">
                <input
                  type="text"
                  placeholder="직종명을 입력해주세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="typo-option-list-caption flex-1 bg-transparent text-text-black placeholder:text-placeholder-gray outline-none"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.708 14.25C11.768 14.25 14.25 11.768 14.25 8.708C14.25 5.649 11.768 3.167 8.708 3.167C5.649 3.167 3.167 5.649 3.167 8.708C3.167 11.768 5.649 14.25 8.708 14.25Z"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.833 15.833L12.667 12.667"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-[20px] pb-[16px]">
              {categoryJobs.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-[8px]">
                  <p className="typo-navbar-button text-text-gray">
                    검색 결과가 없습니다.
                  </p>
                  <p className="typo-option-list-caption text-placeholder-gray">
                    다른 검색어를 입력해주세요.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-[4px]">
                  {categoryJobs.map((job) => {
                    const isSelected = selected?.jobId === job.jobId;
                    return (
                      <button
                        key={job.jobId}
                        type="button"
                        onClick={() => setSelected(job)}
                        className={`flex w-full items-center rounded-[8px] px-[12px] py-[12px] typo-option-list-caption text-left transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-button-blue font-semibold'
                            : 'text-text-black hover:bg-gray-50'
                        }`}
                      >
                        {job.jobName}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-[12px] border-t border-line-gray px-[28px] py-[20px]">
          <Button
            variant="gray"
            size="popup"
            onClick={() => {
              onClose();
              setSelected(null);
              setSearchQuery('');
            }}
          >
            취소
          </Button>
          <Button
            variant="blue"
            size="popup"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onConfirm(selected);
                setSelected(null);
                setSearchQuery('');
              }
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </DimOverlay>
  );
}

export default function WorkInfoForm({
  data,
  errors,
  industries,
  jobs,
  onChange,
}: Props) {
  const [industryModalOpen, setIndustryModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  return (
    <>
      <div className="flex w-[736px] flex-col items-center gap-[40px]">
        <div className="flex w-[736px] flex-col items-start gap-[24px]">
          <h2 className="typo-inform-sub-section text-text-black">근무 정보</h2>
          <div className="h-[1px] w-[736px] bg-line-gray opacity-70" />
        </div>

        <div className="flex w-[671px] flex-col items-start gap-[38px]">
          {/* 업종 + 직종 row */}
          <div className="flex w-[671px] flex-row gap-[19px]">
            <InformationHalf1Input
              id="industry"
              label="업종"
              readOnly
              rightType="dropdown"
              status={errors.industryId ? 'error' : 'default'}
              value={data.industryName}
              placeholder="업종을 선택해주세요."
              onRightClick={() => setIndustryModalOpen(true)}
              onClick={() => setIndustryModalOpen(true)}
            />

            <InformationHalf2Input
              id="job"
              label="직종"
              readOnly
              rightType="dropdown"
              status={errors.jobId ? 'error' : 'default'}
              value={data.jobName}
              placeholder={
                data.industryId
                  ? '직종을 선택해주세요.'
                  : '업종을 먼저 선택해주세요.'
              }
              disabled={!data.industryId}
              onRightClick={() => data.industryId && setJobModalOpen(true)}
              onClick={() => data.industryId && setJobModalOpen(true)}
            />
          </div>

          <InformationOptionField
            label="사업장 규모"
            options={BUSINESS_SIZE_OPTIONS}
            value={data.businessSize}
            error={errors.businessSize}
            onChange={(value) =>
              onChange({ ...data, businessSize: value as BusinessSizeEnum })
            }
          />

          <InformationOptionField
            label="고용 형태"
            options={EMPLOYMENT_TYPE_OPTIONS}
            value={data.employmentType}
            error={errors.employmentType}
            onChange={(value) =>
              onChange({ ...data, employmentType: value as EmploymentTypeEnum })
            }
          />
        </div>
      </div>

      <IndustrySelectModal
        open={industryModalOpen}
        industries={industries}
        onClose={() => setIndustryModalOpen(false)}
        onConfirm={(industry) => {
          onChange({
            ...data,
            industryId: industry.industryId,
            industryName: industry.industryName,
            jobId: null,
            jobName: '',
          });
          setIndustryModalOpen(false);
        }}
      />

      <JobSelectModal
        open={jobModalOpen}
        jobs={jobs}
        onClose={() => setJobModalOpen(false)}
        onConfirm={(job) => {
          onChange({
            ...data,
            jobId: job.jobId,
            jobName: job.jobName,
          });
          setJobModalOpen(false);
        }}
      />
    </>
  );
}
