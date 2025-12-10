// src/pages/PlaceDetailsPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Trash2, MoreVertical } from "lucide-react";
import { useState, useMemo } from "react";

export default function PlaceDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // SAMPLE PROFILE
  const profile = {
    name: "Lorem Ipsum",
    email: "lindablair@mail.com",
    phone: "050 414 8778",
    address: "1833 Bell Meadow Drive, Fontana, California 92335, USA",
  };

  // TABLE DATA
  const [rows, setRows] = useState([
    { id: 1, place: "#Campaign 1", location: "232 lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Completed", enabled: true },
    { id: 2, place: "#Campaign 2", location: "232 lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "On process", enabled: true },
    { id: 3, place: "#Campaign 3", location: "232 lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Completed", enabled: false },
    { id: 4, place: "#Campaign 4", location: "232 lorem ipsum dolor", start: "00:45:10", datetime: "01:00:00", status: "Approved", enabled: true },
  ]);

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

  // DELETE
  const handleDelete = (rowId) => {
    // guard: only allow delete when enabled (optional - you can change)
    const row = rows.find((r) => r.id === rowId);
    if (row && !row.enabled) return; // do nothing when disabled
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  // TOGGLE ON/OFF (DISABLE ROW)
  const handleToggle = (rowId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId ? { ...r, enabled: !r.enabled } : r
      )
    );
  };

  // EYE action (guarded)
  const handleView = (rowId) => {
    const row = rows.find((r) => r.id === rowId);
    if (!row || !row.enabled) return;
    // your view logic here (e.g. navigate to place details)
    alert(`View: ${row.place}`);
  };

  return (
    <div className="p-6 flex gap-6">

      {/* LEFT CARD */}
      <div className="w-80 bg-white rounded-xl shadow p-5">
        <div className="bg-gray-300 h-32 rounded-xl flex justify-center items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-xl">
            🖼️
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center mt-3">{profile.name}</h2>

        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">📧</span>
            <div>{profile.email}</div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">📞</span>
            <div>{profile.phone}</div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">📍</span>
            <div className="leading-5">{profile.address}</div>
          </div>
        </div>
      </div>

      {/* RIGHT TABLE */}
      <div className="flex-1 bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Campaign Lists</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
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
            {rows.map((r) => {
              // disabled visual class (but NOT pointer-events-none, so toggle stays clickable)
              const disabledClass = !r.enabled ? "opacity-50 bg-gray-50" : "";

              return (
                <tr key={r.id} className={`border-b text-sm transition ${disabledClass}`}>
                  {/* Place */}
                  <td
                    onClick={() => r.enabled && navigate(`/tenant/${id}/place/${r.id}/campaign/${r.id}`)}
                    className="py-3 text-blue-600 cursor-pointer hover:underline text-left"
                  >
                    {r.place}
                  </td>


                  {/* Location */}
                  <td>{r.location}</td>

                  {/* Start */}
                  <td>{r.start}</td>

                  {/* DateTime */}
                  <td>{r.datetime}</td>


                  {/* STATUS DROPDOWN WITH ICONS */}
                  <td>
                    <div className="relative group inline-block">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded
                       text-white cursor-pointer select-none ${statusColors[r.status]}`}>
                        {r.status}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-80"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Dropdown - only visible when enabled */}
                      {r.enabled && (
                        <div className="absolute hidden group-hover:block bg-white shadow-lg rounded p-2 top-8 z-20 w-44">

                          {/* ACCEPT */}
                          <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Accept Campaign</span>
                          </div>

                          {/* REJECT */}
                          <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Reject Campaign</span>
                          </div>

                        </div>
                      )}
                    </div>
                  </td>


                  {/* ACTION BUTTONS */}
                  <td className="flex gap-3 justify-center py-3">
                    <button
                      onClick={() => handleView(r.id)}
                      className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                      title={r.enabled ? "View" : "Disabled"}
                    >
                      <Eye className="text-gray-600" size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                      title={r.enabled ? "Delete" : "Disabled"}
                      disabled={!r.enabled}
                    >
                      <Trash2 className="text-red-500" size={18} />
                    </button>

                    <button
                      className={`p-1 rounded ${!r.enabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"}`}
                      title={r.enabled ? "More" : "Disabled"}
                      disabled={!r.enabled}
                    >
                      <MoreVertical className="text-gray-600" size={18} />
                    </button>
                  </td>

                  {/* TOGGLE - always clickable (pointer-events-auto) */}
                  <td>
                    <div
                      onClick={() => handleToggle(r.id)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition pointer-events-auto ${r.enabled ? "bg-blue-500" : "bg-gray-300"}`}
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
