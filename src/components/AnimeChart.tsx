import {
  LineChart,
  Line,
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
    <div className="w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-3">Top Anime Released by Year</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="number"
            allowDecimals={false}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis dataKey="count" type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
