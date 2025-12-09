export default function StatCard({ title, value, percentage }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex flex-col gap-3 w-full">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-green-600 text-sm">{percentage}</div>
    </div>
  );
}
