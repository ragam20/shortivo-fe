type AuthLoadingOverlayProps = {
  label: string;
};

const radius = 30;
const circumference = 2 * Math.PI * radius;

export const AuthLoadingOverlay = ({ label }: AuthLoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <svg
          viewBox="0 0 80 80"
          className="size-20"
          role="img"
          aria-label={label}
        >
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-primary/20"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.32} ${circumference}`}
            className="text-primary/80"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="180 40 40; 540 40 40"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary/80">
          {label}
        </p>
      </div>
    </div>
  );
};
