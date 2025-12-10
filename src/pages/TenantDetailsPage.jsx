// src/pages/TenantDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Eye, Trash2, Pencil } from "lucide-react";
import { useMemo, useState } from "react";

export default function TenantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // sample data (replace with API)
  const initialRows = [
    { id: 1, place: "Rajouri Garden", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Completed", enabled: true },
    { id: 2, place: "GTB Nagar", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "On process", enabled: true },
    { id: 3, place: "Moti Nagar", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Pending", enabled: false },
    { id: 4, place: "Rajender place", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Closed", enabled: false },
    { id: 5, place: "Moti Nagar 2", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "On process", enabled: true },
    { id: 6, place: "GTB Nagar 2", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Closed", enabled: false },
    { id: 7, place: "GTB Nagar 3", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Approved", enabled: true },
    { id: 8, place: "Rajouri Garden 2", location: "232 Lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Completed", enabled: true },
  ];

  const [rows, setRows] = useState(initialRows);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currentRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, rows]);

  const statusColors = {
    Completed: "bg-green-600",
    Pending: "bg-orange-500",
    "On process": "bg-yellow-500",
    Approved: "bg-blue-600",
    Closed: "bg-red-600",
  };

  // CRUD on places
  const toggleEnabled = (placeId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === placeId ? { ...r, enabled: !r.enabled } : r
      )
    );
  };

  const deletePlace = (placeId) => {
    if (!confirm("Delete place?")) return;
    setRows((prev) => prev.filter((r) => r.id !== placeId));
  };

  const editPlace = (placeId) => {
    navigate(`/tenant/${id}/place/${placeId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tenant {id} - Places</h2>

      <div className="bg-white rounded-lg shadow p-5">

        <table className="w-full text-center">
          <thead>
            <tr className="border-b text-gray-500 text-sm text-center">
              <th className="py-2 text-left">Places</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>Date/Time</th>
              <th>Status</th>
              <th>Action</th>
              <th>On/Off</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((r) => {
              const disabledClass = !r.enabled ? "opacity-50 bg-gray-50" : "";

              return (
                <tr key={r.id} className={`border-b text-sm hover:bg-slate-50 ${disabledClass}`}>

                  {/* FIRST COLUMN LEFT-ALIGNED */}
                  <td
                    className="py-3 text-blue-600 cursor-pointer hover:underline text-left"
                    onClick={() => r.enabled && navigate(`/tenant/${id}/place/${r.id}`)}
                  >
                    {r.place}
                  </td>

                  {/* ALL OTHER COLUMNS CENTERED */}
                  <td className="py-3">{r.location}</td>
                  <td className="py-3">{r.start}</td>
                  <td className="py-3">{r.datetime}</td>

                  <td className="py-3">
                    <span className={`text-white px-3 py-1 rounded text-xs ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-3">

                      {/* VIEW */}
                      <button
                        className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}`}
                        disabled={!r.enabled}
                      >
                        <Eye
                          size={16}
                          className="cursor-pointer"
                          onClick={() => r.enabled && navigate(`/tenant/${id}/place/${r.id}`)}
                        />
                      </button>

                      {/* EDIT */}
                      <button
                        className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}`}
                        disabled={!r.enabled}
                        onClick={() => r.enabled && editPlace(r.id)}
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}`}
                        disabled={!r.enabled}
                        onClick={() => r.enabled && deletePlace(r.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>

                    </div>
                  </td>

                  {/* ENABLE TOGGLE */}
                  <td className="py-3">
                    <div
                      onClick={() => toggleEnabled(r.id)}
                      className={`w-12 h-6 flex items-center mx-auto rounded-full p-1 cursor-pointer transition ${r.enabled ? "bg-blue-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${r.enabled ? "translate-x-6" : "translate-x-0"}`}
                      />
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 border rounded"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ←
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const num = i + 1;
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 border rounded ${num === page ? "bg-black text-white" : ""}`}
                >
                  {String(num).padStart(2, "0")}
                </button>
              );
            })}

            <button
              className="px-2 py-1 border rounded"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
