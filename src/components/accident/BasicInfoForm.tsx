import type { AccidentFormData, AccidentFormErrors, GenderEnum } from '../../types/accident';
import InformationLongRightInput from '../common/input/InformationLongRightInput';
import InformationOptionField from '../common/option/InformationOptionField';

const GENDER_OPTIONS = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
];

type Props = {
  data: AccidentFormData;
  errors: AccidentFormErrors;
  onChange: (data: AccidentFormData) => void;
};

export default function BasicInfoForm({ data, errors, onChange }: Props) {
  return (
    <div className="flex w-[736px] flex-col items-center gap-[40px]">
      <div className="flex w-[736px] flex-col items-start gap-[24px]">
        <h2 className="typo-inform-sub-section text-text-black">기본 정보</h2>
        <div className="h-[1px] w-[736px] bg-line-gray opacity-70" />
      </div>

      <div className="flex w-[671px] flex-col items-start gap-[38px]">
        <InformationLongRightInput
          id="age"
          label="나이"
          rightType="measure"
          measure="세"
          type="number"
          min={0}
          max={120}
          placeholder="만 나이를 입력해주세요."
          value={data.age}
          error={errors.age}
          onChange={(e) => onChange({ ...data, age: e.target.value })}
        />

        <InformationOptionField
          label="성별"
          options={GENDER_OPTIONS}
          value={data.gender}
          error={errors.gender}
          onChange={(value) =>
            onChange({ ...data, gender: value as GenderEnum })
          }
        />
      </div>
    </div>
  );
}
