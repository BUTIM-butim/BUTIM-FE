import { useState } from 'react';
import type {
  AccidentFormData,
  AccidentFormErrors,
  DiagnosisCode,
} from '../../types/accident';
import InformationLongInput from '../common/input/InformationLongInput';
import InformationLabel from '../common/input/InformationLabel';
import OutlineButton from '../common/button/OutlineButton';
import CheckIcon from '../common/icons/CheckIcon';

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

            {/* 상병명 입력 (readOnly) */}
            <div className="flex flex-col gap-[14px]">
              <InformationLabel
                htmlFor="symptomInputReadonly"
                label="상병명"
                caption="사고 유형과 다친 부위를 입력해주세요."
              />
              <div className="flex h-[47px] w-[671px] items-center gap-[10px]">
                <div className="flex h-[47px] flex-1 items-center overflow-hidden rounded-[10px] border-[1.3px] border-line-gray bg-white px-[16px]">
                  <input
                    id="symptomInputReadonly"
                    type="text"
                    readOnly
                    value={data.symptomInput}
                    className="typo-navbar-button h-full w-full bg-transparent text-text-black outline-none"
                  />
                </div>
                <div className="h-[47px] w-[91px] shrink-0">
                  <OutlineButton
                    size="information"
                    fullWidth
                    isActive={false}
                    disabled
                  >
                    확인
                  </OutlineButton>
                </div>
              </div>
            </div>

            {/* OptionList Card */}
            <div className="flex w-[671px] flex-col gap-[12px] rounded-[10px] bg-[#F9FAFC] p-[16px]">
              {/* 헤더 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px]">
                  <CheckIcon variant="strategyBlue" checked className="shrink-0" />
                  <p className="typo-popup-button text-text-black">
                    <span className="text-[#185DC5]">입력하신 내용을</span>{' '}
                    이렇게 이해했어요
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-[36px] shrink-0" />
                  <p className="typo-option-list-caption text-placeholder-gray">
                    버팀이 예상한 상병명 리스트 중 가장 적합한 상병명을
                    선택해주세요.
                  </p>
                </div>
              </div>

              {/* 흰색 내부 카드 */}
              {diagnosisCodes.length === 0 ? (
                <div className="flex w-full flex-col items-center gap-[8px] rounded-[10px] bg-white py-[40px]">
                  <p className="typo-navbar-button text-text-gray">
                    검색 결과가 없습니다.
                  </p>
                  <p className="typo-option-list-caption text-placeholder-gray">
                    다른 검색어를 입력해주세요.
                  </p>
                </div>
              ) : (
                <div className="w-full rounded-[10px] bg-white p-[16px] shadow-[0px_0px_20.2px_0px_rgba(30,30,30,0.02)]">
                  <div className="flex flex-col items-center gap-[20px]">
                    {/* 서브타이틀 */}
                    <div className="flex w-full items-center gap-[8px]">
                      <CheckIcon
                        variant="strategyBlue"
                        checked
                        className="shrink-0"
                      />
                      <span className="typo-popup-button text-text-black">
                        {data.symptomInput}
                      </span>
                    </div>

                    {/* 옵션 리스트 */}
                    <div className="flex w-[535px] flex-col">
                      {diagnosisOptions.map((option, index) => (
                        <div key={option.value}>
                          <button
                            type="button"
                            onClick={() =>
                              onChange({
                                ...data,
                                diagnosisCodeSelection: option.value,
                              })
                            }
                            className="flex w-full items-center gap-[8px] py-[12px]"
                          >
                            <CheckIcon
                              variant="smallBlue"
                              checked={
                                data.diagnosisCodeSelection === option.value
                              }
                              className="shrink-0"
                            />
                            <span
                              className={`typo-navbar-button ${
                                data.diagnosisCodeSelection === option.value
                                  ? 'text-button-blue'
                                  : 'text-[#475161]'
                              }`}
                            >
                              {option.label}
                            </span>
                          </button>
                          {index < diagnosisOptions.length - 1 && (
                            <div className="h-px w-full bg-line-gray opacity-70" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
