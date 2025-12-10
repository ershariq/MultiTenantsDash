import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Settings, Plus, X, Check } from "lucide-react";

export default function TenantTable() {
  const navigate = useNavigate();

  // ---------------------
  // TENANTS STATE (CRUD)
  // ---------------------
  const [tenants, setTenants] = useState([
    { id: 1, name: "Tenant 1", campaign: "1,256", running: 500, status: "Running", date: "2025-12-24", enabled: true },
    { id: 2, name: "Tenant 2", campaign: "980", running: 300, status: "Pending", date: "2025-12-24", enabled: false },
    { id: 3, name: "Tenant 3", campaign: "734", running: 200, status: "Approval", date: "2025-12-24", enabled: true },
  ]);

  const statusColors = {
    Running: "bg-blue-500",
    Pending: "bg-yellow-500",
    Approval: "bg-orange-500",
    Completed: "bg-green-500",
  };

  // ---------------------
  // POPUP STATE
  // ---------------------
  const [showPopup, setShowPopup] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", companyId: "", email: "", phone: "" });

  // ---------------------
  // PAGINATION
  // ---------------------
  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = tenants.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currentRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tenants.slice(start, start + pageSize);
  }, [page, tenants]);

  // ---------------------
  // CRUD: ADD TENANT
  // ---------------------
  const addTenant = () => {
    if (!form.name || !form.email) return alert("Name and Email required!");

    const newTenant = {
      id: Date.now(),
      name: form.name,
      campaign: "0",
      running: 0,
      status: "Pending",
      date: "2025-12-24",
      enabled: false,
    };

    setTenants([newTenant, ...tenants]);
    setShowPopup(false);
    setForm({ name: "", companyId: "", email: "", phone: "" });
  };

  // ---------------------
  // DELETE TENANT
  // ---------------------
  const deleteTenant = (id) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  };

  // START EDIT DETAILS
  const startEdit = (t) => {
    setEditing(t.id);
    setForm(t);
  };
  const saveTenant = () => {
    setTenants((prev) =>
      prev.map((t) => (t.id === editing ? form : t))
    );
    setEditing(null);
  };

  // ---------------------
  // TOGGLE ENABLE
  // ---------------------
  // TOGGLE ON/OFF (DISABLE ROW)
  const handleToggle = (rowId) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === rowId ? { ...t, enabled: !t.enabled } : t
      )
    );
  };


  return (
    <>
      {/*              ADD TENANT MODAL POPUP           */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[450px] shadow-lg relative">
            <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 cursor-pointer">
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">Add New Tenant</h2>
            {/* BREADCRUMBS */}
            <div className="text-sm text-gray-500 mb-4">
              Home / Tenants / <span className="text-gray-600 font-medium">Add New Tenant</span>
            </div>

            <div className="mb-3">
              <label className="text-sm font-semibold">Tenant Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                placeholder="Tenant Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="text-sm font-semibold">Company ID</label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                placeholder="Company Name"
                value={form.companyId}
                onChange={(e) => setForm({ ...form, companyId: e.target.value })}
              />
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded mt-1"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Contact Number</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1"
                  placeholder="Contact No."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-16 gap-2">
              <button
                onClick={addTenant}
                className="bg-green-600 text-white px-6 py-2 rounded w-1/2"
              >
                ADD
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-600 text-white px-6 py-2 rounded w-1/2"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/*                  TENANT TABLE                 */}
      <div className="bg-white p-5 rounded-lg shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tenant List</h2>

          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Add Tenant
          </button>
        </div>

        <table className="w-full text-center">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2 text-left">Tenants</th>
              <th>No. of Campaign</th>
              <th>Running</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>On/Off</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((t) => {
              const disabledClass = !t.enabled ? "opacity-50 bg-gray-50" : "";

              return (
                <tr key={t.id} className={`border-b text-sm transition ${disabledClass}`}>

                  {/* FIRST COLUMN LEFT ALIGNED */}
                  <td
                    onClick={() => t.enabled && navigate(`/tenant/${t.id}`)}
                    className="py-3 text-blue-600 cursor-pointer hover:underline text-left"
                  >
                    {t.name}
                  </td>

                  {/* ALL OTHER COLUMNS CENTERED */}
                  <td className="py-3">{t.campaign}</td>
                  <td className="py-3">{t.running}</td>
                  <td className="py-3">{t.date}</td>

                  <td className="py-3">
                    <span className={`text-white px-3 py-1 rounded ${statusColors[t.status]}`}>
                      {t.status}
                    </span>
                  </td>

                  <td className="py-3">
                    <div
                      onClick={() => handleToggle(t.id)}
                      className={`w-12 h-6 flex items-center mx-auto rounded-full p-1 cursor-pointer transition pointer-events-auto ${t.enabled ? "bg-blue-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${t.enabled ? "translate-x-6" : "translate-x-0"}`}
                      />
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => t.enabled && startEdit(t)}
                        className={`p-1 rounded ${!t.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                        title={t.enabled ? "View" : "Disabled"}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteTenant(t.id)}
                        className={`p-1 rounded ${!t.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                        title={t.enabled ? "Delete" : "Disabled"}
                        disabled={!t.enabled}
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>

                      <button
                        className={`p-1 rounded ${!t.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                        title={t.enabled ? "More" : "Disabled"}
                        disabled={!t.enabled}
                      >
                        <Settings size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        {/* -----------------------------
          EDIT FORM POPUP
      ----------------------------- */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Edit Tenant</h3>

              <div className="flex flex-col gap-3">
                <input
                  className="border p-2 rounded"
                  placeholder="Tenant Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Campaign Count"
                  value={form.campaign}
                  onChange={(e) =>
                    setForm({ ...form, campaign: e.target.value })
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Running Campaign"
                  value={form.running}
                  onChange={(e) =>
                    setForm({ ...form, running: e.target.value })
                  }
                />

                <input
                  className="border p-2 rounded"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />

                <select
                  className="border p-2 rounded"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Running</option>
                  <option>Pending</option>
                  <option>Approval</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-5">
                <button
                  onClick={() => setEditing(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={saveTenant}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded"
                >
                  <Check size={16} /> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} entries</p>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))}>←</button>

            {/* page numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const num = idx + 1;
              return (
                <button key={num} onClick={() => setPage(num)} className={`px-3 py-1 border rounded ${num === page ? "bg-black text-white" : ""}`}>{String(num).padStart(2, "0")}</button>
              );
            })}

            <button className="px-2 py-1 border rounded" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>→</button>
          </div>
        </div>
      </div>
    </>
  );
}
