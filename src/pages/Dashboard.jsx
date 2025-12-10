import StatCard from "../components/StatCard";
import TenantTable from "./TenantTable";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Tenants" value="75,000" percentage="+150 New Today" />
        <StatCard title="Total Campaigns" value="35,000" percentage="+130 New Ads" />
        <StatCard title="Total Branches" value="5,000" percentage="+10 New Branches" />
        <StatCard title="Total Running Campaign" value="25,000" percentage="+98 New Ads" />
      </div>

      <TenantTable />
    </div>
  );
}
