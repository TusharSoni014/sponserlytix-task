import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length > 0) {
    const titles = payload[0].payload.titles;
    return (
      <div className="bg-white text-black p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Year {label}</h3>
        <ul>
          {titles.map((title: string, index: number) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

interface ChartData {
  year: number;
  count: number;
  titles: string[];
}

export default function AnimeChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-3">Top Anime Released by Year</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff0000" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#800080" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#800080" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="number"
            allowDecimals={false}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis dataKey="count" type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="natural"
            dataKey="count"
            stroke="#8884d8"
            fill="url(#colorPv)"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
