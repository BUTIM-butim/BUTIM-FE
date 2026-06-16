import { useState } from 'react';
import type {
  AccidentFormData,
  AccidentFormErrors,
  DiagnosisCode,
} from '../../types/accident';
import InformationLongInput from '../common/input/InformationLongInput';
import InformationLabel from '../common/input/InformationLabel';
import InformationOptionField from '../common/option/InformationOptionField';
import OutlineButton from '../common/button/OutlineButton';

type Props = {
  data: AccidentFormData;
  errors: AccidentFormErrors;
  screen: 'input' | 'select';
  diagnosisCodes: DiagnosisCode[];
  suggesting: boolean;
  onChange: (data: AccidentFormData) => void;
  onConfirm: () => void;
};

export default function AccidentForm({
  data,
  errors,
  screen,
  diagnosisCodes,
  suggesting,
  onChange,
  onConfirm,
}: Props) {
  const [symptomFocused, setSymptomFocused] = useState(false);
  const diagnosisOptions = [
    ...diagnosisCodes.map((code) => ({
      label: code.name,
      value: String(code.id),
    })),
    { label: '잘 모르겠어요', value: 'unknown' },
  ];

  const selectedDiagnosisValue = data.diagnosisCodeSelection || undefined;

  return (
    <div className="flex w-[736px] flex-col items-center gap-[40px]">
      <div className="flex w-[736px] flex-col items-start gap-[24px]">
        <h2 className="typo-inform-sub-section text-text-black">사고 정보</h2>
        <div className="h-[1px] w-[736px] bg-line-gray opacity-70" />
      </div>

      <div className="flex w-[671px] flex-col items-start gap-[38px]">
        {screen === 'input' ? (
          <>
            <InformationLongInput
              id="accidentDate"
              label="사고 발생일"
              type="date"
              status={errors.accidentDate ? 'error' : 'default'}
              value={data.accidentDate}
              onChange={(e) =>
                onChange({ ...data, accidentDate: e.target.value })
              }
            />

            <div className="flex flex-col gap-[14px]">
              <InformationLabel
                htmlFor="symptomInput"
                label="상병명"
                caption="사고 유형과 다친 부위를 입력해주세요."
              />
              <div className="flex h-[47px] w-[671px] items-center gap-[10px]">
                <div
                  className={`flex h-[47px] flex-1 items-center overflow-hidden rounded-[10px] border-[1.3px] bg-white px-[16px] ${
                    errors.symptomInput
                      ? 'border-warning-red'
                      : symptomFocused
                        ? 'border-button-blue'
                        : 'border-line-gray'
                  }`}
                >
                  <input
                    id="symptomInput"
                    type="text"
                    placeholder="예시) 작업 중 넘어져 손목이 부러졌습니다."
                    value={data.symptomInput}
                    onFocus={() => setSymptomFocused(true)}
                    onBlur={() => setSymptomFocused(false)}
                    onChange={(e) =>
                      onChange({ ...data, symptomInput: e.target.value })
                    }
                    className="typo-navbar-button h-full w-full bg-transparent text-text-black placeholder:text-placeholder-gray outline-none"
                  />
                </div>
                <div className="h-[47px] w-[91px] shrink-0">
                  <OutlineButton
                    size="information"
                    fullWidth
                    isActive={!!data.symptomInput.trim()}
                    disabled={!data.symptomInput.trim() || suggesting}
                    onClick={onConfirm}
                  >
                    {suggesting ? '조회 중' : '확인'}
                  </OutlineButton>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <InformationLongInput
              id="accidentDate"
              label="사고 발생일"
              type="date"
              readOnly
              value={data.accidentDate}
            />

            <div className="flex w-[671px] flex-col gap-[14px]">
              <label className="typo-navbar-button font-semibold text-text-black">
                상병명
              </label>
              <p className="typo-navbar-button text-text-gray">
                {data.symptomInput}
              </p>
            </div>

            <div className="flex w-[671px] flex-col gap-[20px]">
              <div className="rounded-[10px] bg-[#F5F7FA] px-[20px] py-[16px]">
                <p className="typo-navbar-button text-text-black">
                  <strong>입력하신 내용을</strong>{' '}
                  이렇게 이해했어요
                </p>
              </div>

              <div className="flex w-[671px] flex-col gap-[12px]">
                <p className="typo-option-list-caption text-placeholder-gray">
                  버팀이 예상한 상병명 리스트 중 가장 적합한 상병명을
                  선택해주세요.
                </p>

                {diagnosisCodes.length === 0 ? (
                  <div className="flex w-[671px] flex-col items-center gap-[8px] py-[40px]">
                    <p className="typo-navbar-button text-text-gray">
                      검색 결과가 없습니다.
                    </p>
                    <p className="typo-option-list-caption text-placeholder-gray">
                      다른 검색어를 입력해주세요.
                    </p>
                  </div>
                ) : (
                  <InformationOptionField
                    label=""
                    options={diagnosisOptions}
                    value={selectedDiagnosisValue}
                    error={errors.diagnosisCodeSelection}
                    onChange={(value) =>
                      onChange({ ...data, diagnosisCodeSelection: value })
                    }
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
