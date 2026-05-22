export type TermKey = "privacy" | "service" | "age" | "sms";

export type TermOption = {
  key: TermKey;
  label: string;
  required: boolean;
  expandable?: boolean;
  content?: string;
};

export const REQUIRED_TERMS: TermKey[] = ["privacy", "service", "age"];

export const ALL_TERMS: TermKey[] = ["privacy", "service", "age", "sms"];

export const DEFAULT_TERMS_CAPTION =
  "개인정보 취급방침 · 서비스 이용약관 · 만 14세 이상 이용 동의 (필수) | 문자 수신 동의 (선택)";

export const TERM_CAPTION_LABELS: Record<TermKey, string> = {
  privacy: "개인정보 취급방침",
  service: "서비스 이용약관",
  age: "만 14세 이상 이용 동의",
  sms: "문자 수신 동의",
};

export const TERM_MODAL_LABELS: Record<TermKey, string> = {
  privacy: "[필수] 개인정보 수집 및 이용 동의",
  service: "[필수] 서비스 이용약관",
  age: "[필수] 만 14세 이상 서비스 이용 동의",
  sms: "[선택] 문자 수신 동의",
};
