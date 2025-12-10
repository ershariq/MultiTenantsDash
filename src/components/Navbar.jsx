import { UserButton, OrganizationSwitcher } from "@clerk/clerk-react";
import { FiSearch, FiPlus } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 w-1/3">
        <FiSearch className="text-gray-500" />
        <input
          placeholder="Search"
          className="w-full bg-gray-100 px-3 py-2 rounded-md outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg">
          {/* <FiPlus /> Create New Tenant */}
          <OrganizationSwitcher/>
        </button>

        <UserButton />
      </div>
    </div>
  );
}
