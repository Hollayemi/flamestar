export type ChartSeries = {
  data: number[];
  color: string;
  muted?: boolean;
};

export type AxisChartProps = {
  categories: string[];
  series: ChartSeries[];
  className?: string;
};

const GRID_LINES = [0, 20, 40, 60, 80, 100];

export function AxisChart({ categories, series, className = "" }: AxisChartProps) {
  const width = 480;
  const height = 220;
  const paddingLeft = 30;
  const paddingBottom = 22;
  const plotWidth = width - paddingLeft;
  const plotHeight = height - paddingBottom;

  const toPoints = (data: number[]) => {
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const step = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;
    return data
      .map((value, index) => {
        const x = paddingLeft + index * step;
        const y = plotHeight - ((value - min) / range) * plotHeight;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`h-48 w-full ${className}`}
      aria-hidden="true"
    >
      {GRID_LINES.map((line) => {
        const y = plotHeight - (line / 100) * plotHeight;
        return (
          <g key={line}>
            <line
              x1={paddingLeft}
              x2={width}
              y1={y}
              y2={y}
              stroke="rgba(11,13,16,0.06)"
              strokeWidth={1}
            />
            <text x={0} y={y + 3.5} fontSize={9} fill="var(--color-muted-light)">
              {line}
            </text>
          </g>
        );
      })}

      {series.map((s, index) => (
        <polyline
          key={index}
          points={toPoints(s.data)}
          fill="none"
          stroke={s.color}
          strokeWidth={s.muted ? 1.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.muted ? 0.3 : 1}
        />
      ))}

      {categories.map((label, index) => {
        const step = categories.length > 1 ? plotWidth / (categories.length - 1) : plotWidth;
        const x = paddingLeft + index * step;
        return (
          <text
            key={label}
            x={x}
            y={height}
            fontSize={9}
            fill="var(--color-muted-light)"
            textAnchor="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
