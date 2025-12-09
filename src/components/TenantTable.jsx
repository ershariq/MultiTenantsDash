export default function TenantTable() {
  const tenants = [
    { name: "Tenant 1", campaign: "1,256", running: 500, status: "Running", date: "24/12/2025" },
    { name: "Tenant 2", campaign: "Vegetables", running: 500, status: "Pending", date: "24/12/2025" },
    { name: "Tenant 3", campaign: "Vegetables", running: 500, status: "Approval", date: "24/12/2025" },
    { name: "Tenant 4", campaign: "Vegetables", running: 500, status: "Completed", date: "24/12/2025" },
  ];

  const statusColors = {
    Running: "bg-blue-500",
    Pending: "bg-yellow-500",
    Approval: "bg-orange-500",
    Completed: "bg-green-500",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Tenant List</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2 text-left">Tenants</th>
            <th className="py-2">No. of Campaign</th>
            <th className="py-2">Running Campaign</th>
            <th className="py-2">Expiry Date</th>
            <th className="py-2">All Status</th>
            <th className="py-2">On/Off</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {tenants.map((t, i) => (
            <tr key={i} className="border-b text-sm">
              <td className="py-3">{t.name}</td>
              <td>{t.campaign}</td>
              <td>{t.running}</td>
              <td>{t.date}</td>
              <td>
                <span className={`px-3 py-1 text-white rounded ${statusColors[t.status]}`}>
                  {t.status}
                </span>
              </td>
              <td>
                <input type="checkbox" className="toggle-checkbox" />
              </td>
              <td className="flex gap-3 text-gray-600">
                ✏️ 🗑️ ⚙️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
