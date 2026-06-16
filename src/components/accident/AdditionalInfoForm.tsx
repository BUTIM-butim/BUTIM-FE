import { useState } from 'react';
import type { AccidentFormData } from '../../types/accident';
import InformationLabel from '../common/input/InformationLabel';

const MAX_LENGTH = 300;

type Props = {
  data: AccidentFormData;
  onChange: (data: AccidentFormData) => void;
};

export default function AdditionalInfoForm({ data, onChange }: Props) {
  const [focused, setFocused] = useState(false);
  const count = data.additionalInfo.length;

  return (
    <div className="flex w-[736px] flex-col items-center gap-[40px]">
      <div className="flex w-[736px] flex-col items-start gap-[24px]">
        <h2 className="typo-inform-sub-section text-text-black">추가 정보</h2>
        <div className="h-[1px] w-[736px] bg-line-gray opacity-70" />
      </div>

      <div className="flex w-[671px] flex-col items-start gap-[14px]">
        <InformationLabel
          label="추가적으로 설명하고 싶은 내용이 있다면 자유롭게 작성해주세요 (선택)"
          caption="최대 300자까지 입력할 수 있어요."
        />

        <div
          className={`w-[671px] rounded-[10px] border-[1.3px] bg-white transition-colors ${
            focused ? 'border-button-blue' : 'border-line-gray'
          }`}
        >
          <textarea
            value={data.additionalInfo}
            maxLength={MAX_LENGTH}
            placeholder="예시) 작업 중 미끄러져 넘어지면서 손목을 다쳤고 당시 보호장비는 착용하지 않은 상태였습니다."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) =>
              onChange({ ...data, additionalInfo: e.target.value })
            }
            className="typo-navbar-button h-[180px] w-full resize-none rounded-[10px] bg-transparent px-[16px] py-[14px] text-text-black placeholder:text-placeholder-gray outline-none"
          />
        </div>

        <p className="typo-option-list-caption w-full text-right text-placeholder-gray">
          {count} / {MAX_LENGTH}
        </p>
      </div>
    </div>
  );
}
