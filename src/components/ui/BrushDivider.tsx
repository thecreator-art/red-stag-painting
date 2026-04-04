interface BrushDividerProps {
  colorFrom?: string;
  colorTo?: string;
  flip?: boolean;
  className?: string;
}

export default function BrushDivider({
  colorFrom = '#FDFCFA',
  colorTo = '#F5F1EC',
  flip = false,
  className = '',
}: BrushDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: 60, marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        {/* Background fill */}
        <rect width="1440" height="60" fill={colorTo} />
        {/* Organic wave shape */}
        <path
          d="M0,0 L1440,0 L1440,20 C1320,55 1200,35 1080,45 C960,55 840,25 720,35 C600,45 480,20 360,30 C240,40 120,15 0,25 Z"
          fill={colorFrom}
        />
      </svg>
    </div>
  );
}
