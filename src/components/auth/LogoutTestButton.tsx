// 네브바에 로그아웃 연결 후 삭제 예정
import { useLogout } from "../../hooks/useLogout";

import Button from "../common/button/Button";

const LogoutTestButton = () => {
  const { logout, isLoggingOut } = useLogout();

  return (
    <Button
      variant="blue"
      size="login"
      type="button"
      onClick={() => {
        void logout();
      }}
      disabled={isLoggingOut}
    >
      로그아웃
    </Button>
  );
};

export default LogoutTestButton;
