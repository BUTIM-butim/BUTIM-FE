export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  name: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  termsAgreed: boolean;
  pushAlarmAgreed: boolean;
};
