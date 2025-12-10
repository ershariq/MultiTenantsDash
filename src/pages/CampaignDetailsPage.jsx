import { useState, useMemo, useEffect } from "react";
import { Pencil, Play } from "lucide-react";

export default function PlaceDetailsPage() {

    // LEFT SIDE CAMPAIGN INFORMATION
    const campaign = {
        title: "Campaign 1",
        name: "Weekend Brunch Special",
        id: "RST-2047",
        location: "The Urban Spoon\nOutdoor LED Menu Board",
        start: "Start: Dec 12, 2025 — 08:00 AM",
        end: "End: Dec 14, 2025 — 11:00 PM",
        duration: "Total Duration: 3 Days",
        status: "Active",
        created: "Sarah Mathews - RMS",
        edited: "Michael Reed\nContent Designer",
        updatedAt: "Last Updated: Dec 06, 2025 — 02:45 PM",
    };

    // TABLE DATA
    const [rows, setRows] = useState([
        { id: 1, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Running", enabled: true },
        { id: 2, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Running", enabled: true },
        { id: 3, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Running", enabled: true },
        { id: 4, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Approved", enabled: true },
        { id: 5, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Approved", enabled: true },
        { id: 6, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Cancelled", enabled: true },
        { id: 7, video: "Promo_Offer_20OFF", start: "00:45:10", time: "01:00:00", status: "Under process", enabled: true },
    ]);

    // ---------------------
    // POPUP STATE
    // ---------------------
    const [showPopup, setShowPopup] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", companyId: "", email: "", phone: "" });

    // STATUS COLORS
    const statusColors = {
        Running: "bg-green-600",
        Approved: "bg-blue-600",
        Cancelled: "bg-red-600",
        "Under process": "bg-yellow-500",
    };

    // START EDIT DETAILS
    const startEdit = (t) => {
        setEditing(t.id);
        setForm(t);
    };

    // TOGGLE ENABLE
    const handleToggle = (id) => {
        setRows(prev =>
            prev.map(r =>
                r.id === id ? { ...r, enabled: !r.enabled } : r
            )
        );
    };

    // PAGINATION
    const pageSize = 8;
    const [page, setPage] = useState(1);
    const total = rows.length;
    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        setPage(1);
    }, [rows]);

    const currentRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [page, rows]);


    return (<>
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
        <div className="p-6 flex gap-6">

            {/* LEFT CAMPAIGN CARD */}
            <div className="w-80 bg-white rounded-xl shadow p-5">
                <div className="h-40 rounded-xl bg-gray-200 flex items-center justify-center">
                    <div className="w-28 h-28 bg-gray-300 rounded-full flex justify-center items-center">
                        <span className="text-2xl">🖼️</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center mt-3">{campaign.title}</h2>

                <div className="mt-5 space-y-3 text-sm border-t pt-4">
                    <p><strong>Campaign Name</strong><br />{campaign.name}</p>
                    <p><strong>Campaign ID</strong><br />{campaign.id}</p>
                    <p><strong>Location</strong><br />{campaign.location}</p>
                    <p><strong>Start Time</strong><br />{campaign.start}</p>
                    <p><strong>End Time</strong><br />{campaign.end}</p>
                    <p><strong>Duration</strong><br />{campaign.duration}</p>
                    <p><strong>Campaign Status</strong><br />{campaign.status}</p>
                    <p><strong>Created By</strong><br />{campaign.created}</p>
                    <p><strong>Last Edited By</strong><br />{campaign.edited}</p>
                    <p className="text-xs text-gray-500 pt-3 border-t">{campaign.updatedAt}</p>
                </div>
            </div>

            {/* RIGHT PLAYLIST TABLE */}
            <div className="flex-1 bg-white rounded-xl shadow p-5">
                <h2 className="text-xl font-semibold mb-4">Playlists</h2>

                <table className="w-full text-center">
                    <thead>
                        <tr className="border-b text-gray-500 text-sm">
                            <th className="py-2 text-start">No. of Video</th>
                            <th>Video</th>
                            <th>Video Name</th>
                            <th>Start Time</th>
                            <th>Date/Time</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>On/Off</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRows.map((r, index) => (
                            <tr key={r.id} className="border-b text-sm hover:bg-gray-50">

                                {/* INDEX */}
                                <td className="py-3 font-semibold text-start">#{index + 1}</td>

                                {/* THUMBNAIL */}
                                <td>
                                    <video
                                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                                        className="w-10 h-10 rounded object-cover border"
                                        muted autoPlay loop
                                    />
                                </td>

                                {/* VIDEO NAME */}
                                <td>{r.video}</td>

                                {/* START TIME */}
                                <td>{r.start}</td>

                                {/* TIME */}
                                <td>{r.time}</td>

                                {/* STATUS BADGE */}
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded text-white text-xs ${statusColors[r.status]}`}
                                    >
                                        {r.status}
                                    </span>
                                </td>

                                {/* ACTION BUTTONS */}
                                <td className="py-3">
                                    <div className="flex items-center justify-center gap-3">

                                        {/* EDIT */}
                                        <button
                                            onClick={() => (r.enabled ? startEdit(r) : null)}
                                            className={`p-1 rounded ${!r.enabled
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "hover:bg-gray-100"
                                                }`}
                                            title={r.enabled ? "Edit" : "Disabled"}
                                            disabled={!r.enabled}
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        {/* PLAY */}
                                        <button
                                            onClick={() =>
                                                r.enabled ? console.log("Play Video:", r.id) : null
                                            }
                                            className={`p-1 rounded ${!r.enabled
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "hover:bg-gray-100"
                                                }`}
                                            title={r.enabled ? "Play" : "Disabled"}
                                            disabled={!r.enabled}
                                        >
                                            <Play size={18} />
                                        </button>
                                    </div>
                                </td>

                                {/* TOGGLE */}
                                <td className="py-3">
                                    <div
                                        onClick={() => handleToggle(r.id)}
                                        className={`w-12 h-6 flex items-center mx-auto rounded-full p-1 cursor-pointer transition ${r.enabled ? "bg-blue-500" : "bg-gray-300"
                                            }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${r.enabled ? "translate-x-6" : "translate-x-0"
                                                }`}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION */}
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
                                    className={`px-3 py-1 border rounded ${num === page ? "bg-black text-white" : ""
                                        }`}
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
    </>
    );
}
