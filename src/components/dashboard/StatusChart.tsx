"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  applied: number;
  interview: number;
  selected: number;
  rejected: number;
};

export default function StatusChart({
  applied,
  interview,
  selected,
  rejected,
}: Props) {
  const data = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Selected", value: selected },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#22C55E",
    "#EF4444",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        📊 Application Status
      </h2>

      <p className="text-gray-500 mb-6">
        Distribution of your job applications by status.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={4}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}