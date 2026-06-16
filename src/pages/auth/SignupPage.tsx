import SignupCard from "../../components/auth/SignupCard";

const SignupPage = () => {
  return (
    <main className="flex min-h-screen items-start justify-center bg-background-blue px-6 py-[16px]">
      <SignupCard mode="signup" />
    </main>
  );
};

export default SignupPage;
