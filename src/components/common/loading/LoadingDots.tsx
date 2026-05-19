// 로딩 컴포넌트
const LOADING_DOT_DELAYS = [-0.3, -0.1, 0.1, 0.3, 0.5];

const LoadingDots = () => {
  return (
    <section
      role="status"
      aria-label="로딩 중"
      className="flex items-center justify-center gap-[10px]"
    >
      {LOADING_DOT_DELAYS.map((delay) => (
        <div
          key={delay}
          className="loading-dot"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </section>
  );
};

export default LoadingDots;
