import CheckButton from "../common/check/CheckButton";
import UnderlineButton from "../common/button/UnderlineButton";

type TermsAgreementItemProps = {
  label: string;
  checked: boolean;
  expandable?: boolean;
  expanded?: boolean;
  content?: string;
  onToggleCheck: () => void;
  onToggleExpand?: () => void;
};

const TermsAgreementItem = ({
  label,
  checked,
  expandable = false,
  expanded = false,
  content,
  onToggleCheck,
  onToggleExpand,
}: TermsAgreementItemProps) => {
  return (
    <div>
      <div className="flex h-[17px] w-[331px] items-center">
        <CheckButton
          variant="smallGray"
          checked={checked}
          onClick={onToggleCheck}
          aria-label={`${label} 동의`}
          className="mr-[2px] cursor-pointer"
        />

        <span className="typo-popup-caption text-popup-gray">{label}</span>

        {expandable && (
          <UnderlineButton
            size="small"
            type="button"
            onClick={onToggleExpand}
            className="ml-auto"
          >
            {expanded ? "약관 접기" : "약관 보기"}
          </UnderlineButton>
        )}
      </div>

      {expandable && expanded && content && (
        <div className="mt-[14px] h-[166px] w-[331px] overflow-y-auto rounded-[8px] bg-card-background-blue px-[10px] py-[11px]">
          <pre className="typo-terms-regular whitespace-pre-wrap break-keep text-popup-gray">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TermsAgreementItem;
