import LogoFullLoginImage from "../../../assets/logo-full-login.svg";

type LogoFullLoginProps = {
  className?: string;
};

const LogoFullLogin = ({ className = "" }: LogoFullLoginProps) => {
  return (
    <img
      src={LogoFullLoginImage}
      alt="버팀"
      className={`h-auto w-[237px] ${className}`}
      draggable={false}
    />
  );
};

export default LogoFullLogin;
