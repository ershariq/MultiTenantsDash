import { FiHome, FiUsers, FiSettings, FiBox, FiBarChart2, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const menu = [
    { icon: <FiHome />, label: "Dashboard" },
    { icon: <FiUsers />, label: "Tenants" },
    { icon: <FiBox />, label: "Global Campaigns" },
    { icon: <FiUsers />, label: "Users" },
    { icon: <FiBarChart2 />, label: "Analytics" },
    { icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col">
      <div className="text-xl font-bold mb-8">Company Logo</div>

      {menu.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-200 cursor-pointer"
        >
          {item.icon}
          {item.label}
        </div>
      ))}

      <div className="mt-auto flex items-center gap-3 p-3 rounded-lg text-red-600 cursor-pointer">
        <FiLogOut /> Logout
      </div>
    </div>
  );
}
