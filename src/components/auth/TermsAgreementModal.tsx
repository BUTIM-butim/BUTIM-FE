import { useMemo, useState } from "react";

import Button from "../common/button/Button";
import CheckButton from "../common/check/CheckButton";
import CloseIcon from "../common/icons/CloseIcon";
import DimOverlay from "../common/overlay/DimOverlay";
import TermsAgreementItem from "./TermsAgreementItem";

import {
  TERM_MODAL_LABELS,
  type TermKey,
  type TermOption,
} from "../../types/terms";

type TermsAgreementModalProps = {
  selectedTerms: TermKey[];
  onClose: () => void;
  onConfirm: (selectedTerms: TermKey[]) => void;
};

const PRIVACY_CONTENT = `버팀은 산업재해 신청 승인 기간 예측, 현금 공백 분석, 맞춤형 대응 전략 추천을 위해 아래와 같이 개인정보를 수집·이용합니다.
이용자는 본 동의를 거부할 권리가 있으나, 필수 정보 수집 및 이용에 동의하지 않을 경우 버팀의 주요 서비스 이용이 제한될 수 있습니다.

1. 수집 및 이용 목적
버팀은 수집한 정보를 다음의 목적으로 이용합니다.
① 산업재해 신청 승인 예상 기간 산출
② 현금 공백 발생 시점 예측
③ 현금흐름 분석 및 그래프 제공
④ 이용자 상황에 맞는 복지 지원금, 저금리 대출 등 대응 전략 추천
⑤ 유사 사례 기반 예측 신뢰도 산정
⑥ 신청 시작일, 신청 마감일, 지급 예정일 등 주요 일정 안내
⑦ 이용자가 선택한 맞춤 전략의 저장 및 관리
⑧ 서비스 개선 및 사용자 경험 분석
⑨ 부정 이용 방지 및 서비스 안정성 확보

2. 수집하는 개인정보 항목
버팀은 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.
1) 기본 정보
- 이름
- 이메일
- 나이
- 성별
2) 산업재해 신청 승인 기간 예측 관련 정보
- 사고 발생일
- 사고 유형
- 부상 부위
- 상병명
- 업종 및 직종
- 사업장 규모
- 고용 형태
- 사고 관련 추가 설명
3) 맞춤 전략 추천 관련 정보
- 현재 자산
- 월 고정 지출
- 기준 중위소득
- 현재 고용 상태
- 가족 구성
- 복지 대상 여부
- 거주 지역
- 임신 여부
- 장애 여부
4) 알림 제공 관련 정보
- 휴대전화번호
- 알림 수신 여부
5) 서비스 이용 과정에서 생성되는 정보
- 서비스 이용 기록
- 입력 정보 기반 분석 결과
- 예측 결과 조회 기록
- 추천 전략 선택 기록
- 접속 일시
- 기기 및 브라우저 정보

3. 민감정보 포함 안내
버팀은 산업재해 신청 승인 기간 예측 및 맞춤형 지원 전략 추천 과정에서 상병명, 사고 관련 추가 설명, 임신 여부, 장애 여부 등 민감한 정보가 포함된 항목을 수집할 수 있습니다.
해당 정보는 산업재해 신청 승인 기간 예측, 지원 대상 여부 판단, 복지 지원금 및 지원 전략 추천 목적에 한해 이용됩니다.

4. 개인정보의 보유·이용 기간
수집한 개인정보는 서비스 제공 목적 달성 시까지 보관합니다.
회원 탈퇴, 서비스 이용 종료 또는 개인정보 삭제 요청 시 해당 정보를 지체 없이 파기합니다.
단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 법령에서 정한 기간 동안 보관할 수 있습니다.

5. 개인정보의 제3자 제공
버팀은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
다만, 다음의 경우에는 예외적으로 제공될 수 있습니다.
① 이용자가 사전에 동의한 경우
② 법령에 따라 제공 의무가 발생한 경우
③ 수사기관 또는 공공기관의 적법한 요청이 있는 경우

6. 개인정보 처리의 위탁
버팀은 원활한 서비스 제공을 위해 필요한 경우 개인정보 처리 업무의 일부를 외부 서비스에 위탁할 수 있습니다.
위탁이 발생하는 경우 위탁받는 자, 위탁 업무의 내용, 보유 및 이용 기간 등을 서비스 화면 또는 개인정보 처리방침을 통해 안내합니다.

7. 동의를 거부할 권리 및 불이익
이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 정보 수집 및 이용에 동의하지 않을 경우 산업재해 신청 승인 기간 예측, 현금 공백 분석, 현금흐름 그래프, 맞춤형 대응 전략 추천 등 버팀의 주요 서비스 이용이 제한될 수 있습니다.

8. 개인정보의 파기
버팀은 개인정보의 보유·이용 기간이 종료되거나 처리 목적이 달성된 경우 해당 정보를 지체 없이 파기합니다.
전자적 파일 형태의 정보는 복구할 수 없는 방법으로 삭제하며, 출력물 등 종이 문서 형태의 정보는 분쇄 또는 소각 등의 방법으로 파기합니다.`;

const SERVICE_CONTENT = `본 약관은 버팀이 제공하는 산업재해 신청 승인 기간 예측, 현금 공백 분석, 현금흐름 그래프 제공 및 맞춤형 대응 전략 추천 서비스의 이용과 관련하여 서비스 제공자와 이용자 간의 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다.

제1조 목적
본 약관은 이용자가 버팀 서비스를 이용함에 있어 필요한 서비스 이용 조건, 제공 범위, 이용자의 의무, 책임 제한 및 기타 필요한 사항을 규정합니다.

제2조 용어의 정의
본 약관에서 사용하는 용어의 의미는 다음과 같습니다.
1. “서비스”란 버팀이 제공하는 산업재해 신청 승인 기간 예측, 현금 공백 분석, 현금흐름 그래프 제공, 맞춤형 대응 전략 추천 및 관련 알림 기능을 의미합니다.
2. “이용자”란 본 약관에 동의하고 버팀 서비스를 이용하는 회원 또는 비회원을 의미합니다.
3. “입력 정보”란 이용자가 서비스 이용 과정에서 직접 입력한 기본 정보, 산업재해 신청 승인 기간 예측 관련 정보, 맞춤 전략 추천 관련 정보, 알림 제공 관련 정보 등을 의미합니다.
4. “예측 결과”란 이용자가 입력한 정보와 공공데이터, 유사 사례 및 서비스 내부 분석 기준을 바탕으로 산출된 산업재해 신청 승인 예상 기간, 현금 공백 발생 시점, 현금흐름 분석 결과 등을 의미합니다.
5. “맞춤 전략”이란 이용자의 상황에 따라 제공되는 복지 지원금, 저금리 대출, 신청 일정 등 현금 공백 대응을 위한 참고 정보를 의미합니다.

제3조 서비스의 내용
버팀은 이용자가 입력한 정보를 바탕으로 다음과 같은 서비스를 제공합니다.
1. 산업재해 신청 승인 예상 기간 예측
2. 산업재해 신청 이후 발생할 수 있는 현금 공백 시점 예측
3. 현재 자산, 월 고정 지출 등을 기반으로 한 현금흐름 분석 및 그래프 제공
4. 이용자 상황에 맞는 복지 지원금, 저금리 대출 등 맞춤형 대응 전략 추천
5. 신청 시작일, 신청 마감일, 지급 예정일 등 주요 일정 안내
6. 이용자가 선택한 맞춤 전략의 저장 및 관리 기능

제4조 서비스 이용 조건
이용자는 서비스 이용을 위해 필요한 정보를 정확하게 입력해야 합니다.
버팀은 이용자가 입력한 정보를 기준으로 예측 결과와 맞춤 전략을 제공하므로, 입력 정보가 부정확하거나 누락된 경우 결과의 정확도가 낮아질 수 있습니다.
이용자는 타인의 개인정보를 무단으로 입력하거나 허위 정보를 입력해서는 안 됩니다.

제5조 예측 결과 및 추천 정보의 성격
버팀이 제공하는 산업재해 신청 승인 예상 기간, 현금 공백 발생 시점, 현금흐름 그래프, 맞춤형 대응 전략 추천 결과는 이용자가 입력한 정보, 공공데이터, 유사 사례 및 서비스 내부 분석 기준을 바탕으로 산출된 참고용 정보입니다.
버팀은 실제 산업재해 신청 승인 여부, 승인 기간, 지급일, 지원금 수급 가능 여부, 대출 승인 여부 등을 보장하지 않습니다.
이용자는 최종 신청 및 의사결정 전 근로복지공단, 고용노동부, 지방자치단체, 금융기관 등 관련 기관의 공식 안내를 반드시 확인해야 합니다.

제6조 맞춤 전략 및 알림의 이용
버팀은 이용자가 입력한 정보와 선택한 맞춤 전략을 바탕으로 신청 시작일, 신청 마감일, 지급 예정일 등 주요 일정을 안내할 수 있습니다.
알림은 이용자의 설정 및 동의 여부에 따라 제공되며, 알림 수신 여부와 관계없이 실제 신청, 제출, 확인 등의 책임은 이용자에게 있습니다.
이용자는 서비스에서 안내하는 일정과 정보를 참고하되, 각 지원금 및 대출의 실제 신청 가능 여부와 마감일은 관련 기관의 공식 안내를 통해 확인해야 합니다.

제7조 이용자의 의무
이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 해서는 안 됩니다.
1. 타인의 개인정보를 무단으로 입력하거나 도용하는 행위
2. 허위 정보를 입력하여 서비스 결과를 왜곡하는 행위
3. 서비스의 정상적인 운영을 방해하는 행위
4. 서비스 내 정보를 무단으로 복제, 배포 또는 상업적으로 이용하는 행위
5. 서비스의 보안 체계를 침해하거나 비정상적인 방식으로 접근하는 행위
6. 법령 또는 공공질서에 위반되는 행위

제8조 서비스 제공의 변경 및 중단
버팀은 서비스 개선, 시스템 점검, 데이터 연동 오류, 공공데이터 제공 기관의 사정, 네트워크 장애 등 불가피한 사유가 발생한 경우 서비스의 일부 또는 전부를 변경하거나 일시적으로 중단할 수 있습니다.
또한 서비스 운영상 필요한 경우 제공 기능, 화면 구성, 추천 기준, 알림 방식 등을 변경할 수 있습니다.

제9조 책임의 제한
버팀은 법률, 노무, 의료, 금융 자문을 직접 제공하는 서비스가 아닙니다.
서비스에서 제공되는 모든 예측 결과와 추천 정보는 이용자의 의사결정을 돕기 위한 참고 자료이며, 실제 기관의 심사 결과, 정책 변경, 공공데이터 갱신 여부, 금융기관 심사 기준 등에 따라 달라질 수 있습니다.
입력 정보의 오류, 누락, 정책 변경, 공공데이터 지연, 기관별 심사 기준 차이 등으로 인해 발생하는 결과 차이에 대해 버팀은 책임을 지지 않습니다.
또한 이용자가 서비스에서 제공된 정보를 바탕으로 신청, 대출, 지원금 수급 등 외부 기관과 관련된 절차를 진행하는 경우, 그 결과에 대한 최종 책임은 이용자에게 있습니다.

제10조 지식재산권
버팀 서비스 내 화면, 콘텐츠, 분석 구조, 추천 방식, 그래프 구성, 문구, 디자인 및 기타 서비스 구성 요소에 대한 권리는 서비스 제공자에게 있습니다.
이용자는 버팀의 사전 동의 없이 서비스의 일부 또는 전부를 복제, 배포, 수정하거나 상업적으로 이용할 수 없습니다.

제11조 약관의 변경
버팀은 필요한 경우 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.
약관이 변경되는 경우 서비스 화면 또는 알림을 통해 변경 내용을 안내합니다.
변경된 약관은 공지한 시점부터 효력이 발생합니다.

제12조 기타
본 약관에서 정하지 않은 사항은 관련 법령 및 일반적인 서비스 이용 관례에 따릅니다.`;

const TERMS: TermOption[] = [
  {
    key: "privacy",
    label: TERM_MODAL_LABELS.privacy,
    required: true,
    expandable: true,
    content: PRIVACY_CONTENT,
  },
  {
    key: "service",
    label: TERM_MODAL_LABELS.service,
    required: true,
    expandable: true,
    content: SERVICE_CONTENT,
  },
  {
    key: "age",
    label: TERM_MODAL_LABELS.age,
    required: true,
  },
  {
    key: "sms",
    label: TERM_MODAL_LABELS.sms,
    required: false,
  },
];

const ALL_TERM_KEYS = TERMS.map((term) => term.key);

const TermsAgreementModal = ({
  selectedTerms,
  onClose,
  onConfirm,
}: TermsAgreementModalProps) => {
  const [localSelectedTerms, setLocalSelectedTerms] =
    useState<TermKey[]>(selectedTerms);
  const [expandedTerm, setExpandedTerm] = useState<TermKey | null>(null);

  const isAllChecked = useMemo(() => {
    return ALL_TERM_KEYS.every((key) => localSelectedTerms.includes(key));
  }, [localSelectedTerms]);

  const toggleTerm = (key: TermKey) => {
    setLocalSelectedTerms((prev) => {
      if (prev.includes(key)) {
        return prev.filter((term) => term !== key);
      }

      return [...prev, key];
    });
  };

  const toggleAllTerms = () => {
    if (isAllChecked) {
      setLocalSelectedTerms([]);
      return;
    }

    setLocalSelectedTerms(ALL_TERM_KEYS);
  };

  const toggleExpandedTerm = (key: TermKey) => {
    setExpandedTerm((prev) => (prev === key ? null : key));
  };

  const handleConfirm = () => {
    onConfirm(localSelectedTerms);
  };

  return (
    <DimOverlay>
      <section className="relative flex w-[533px] max-h-[calc(100vh-80px)] flex-col items-center overflow-y-auto rounded-[16px] bg-white shadow-popup">
        <button
          type="button"
          aria-label="약관 팝업 닫기"
          onClick={onClose}
          className="absolute right-[12.5px] top-[12.5px] flex h-[31px] w-[31px] cursor-pointer items-center justify-center"
        >
          <CloseIcon />
        </button>

        <h2 className="typo-popup-title mt-[50px] text-center text-text-black">
          약관 확인 및 동의
        </h2>

        <p className="typo-popup-caption mt-[16px] text-center text-popup-gray">
          아래 약관을 확인하신 후 동의해 주세요.
        </p>

        <div className="mt-[32px] w-[331px]">
          <div className="flex h-[21px] items-center">
            <CheckButton
              variant="large"
              checked={isAllChecked}
              onClick={toggleAllTerms}
              aria-label="전체 약관 동의"
              className="mr-[4px] cursor-pointer"
            />

            <span className="typo-popup-button text-text-black">전체 동의</span>
          </div>

          <div className="mt-[14px] h-[1px] w-[331px] bg-line-gray/30" />

          <div className="mt-[14px] flex flex-col gap-[14px]">
            {TERMS.map((term) => (
              <div key={term.key}>
                <TermsAgreementItem
                  label={term.label}
                  checked={localSelectedTerms.includes(term.key)}
                  expandable={term.expandable}
                  expanded={expandedTerm === term.key}
                  content={term.content}
                  onToggleCheck={() => toggleTerm(term.key)}
                  onToggleExpand={() => toggleExpandedTerm(term.key)}
                />
                <div className="mt-[14px] h-[1px] w-[331px] bg-line-gray/30" />
              </div>
            ))}
          </div>

          <Button
            variant="blue"
            size="popup"
            type="button"
            onClick={handleConfirm}
            className="mt-[28px] w-[331px]"
          >
            확인하고 계속하기
          </Button>
        </div>

        <div className="h-[36px]" />
      </section>
    </DimOverlay>
  );
};

export default TermsAgreementModal;
