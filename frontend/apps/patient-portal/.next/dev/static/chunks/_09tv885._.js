(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/apps/patient-portal/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBooking",
    ()=>createBooking,
    "getBookings",
    ()=>getBookings,
    "getNotifications",
    ()=>getNotifications,
    "getProfile",
    ()=>getProfile,
    "getSlots",
    ()=>getSlots,
    "login",
    ()=>login,
    "refreshToken",
    ()=>refreshToken,
    "register",
    ()=>register,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || '';
let inMemoryToken = null;
async function request(path, opts = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...opts.headers || {}
    };
    if (inMemoryToken) headers['Authorization'] = `Bearer ${inMemoryToken}`;
    const res = await fetch(`${BASE}${path}`, {
        ...opts,
        headers,
        credentials: 'include'
    });
    if (res.status === 401) {
        // Attempt refresh
        const refreshed = await refreshToken();
        if (refreshed) {
            headers['Authorization'] = `Bearer ${inMemoryToken}`;
            return fetch(`${BASE}${path}`, {
                ...opts,
                headers,
                credentials: 'include'
            });
        }
    }
    return res;
}
async function login(payload) {
    const res = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    inMemoryToken = data.token;
    return data;
}
async function register(payload) {
    const res = await request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Register failed');
    return res.json();
}
async function refreshToken() {
    const res = await fetch(`${BASE}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!res.ok) return false;
    const data = await res.json();
    inMemoryToken = data.token;
    return true;
}
async function getBookings(patientId, status) {
    const q = new URLSearchParams();
    if (patientId) q.set('patientId', patientId);
    if (status) q.set('status', status);
    const res = await request(`/api/bookings?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
}
async function createBooking(body) {
    const res = await request('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Booking failed');
    return res.json();
}
async function getSlots(doctorId, date) {
    const q = new URLSearchParams();
    if (doctorId) q.set('doctorId', doctorId);
    if (date) q.set('date', date);
    const res = await request(`/api/slots?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch slots');
    return res.json();
}
async function getProfile() {
    const res = await request('/api/users/me');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
}
async function updateProfile(payload) {
    const res = await request('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
}
async function getNotifications() {
    const res = await request('/api/notifications');
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
}
}),
"[project]/frontend/apps/patient-portal/lib/hooks/useSlots.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSlots",
    ()=>useSlots
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/apps/patient-portal/lib/api.ts [app-client] (ecmascript)");
"use client";
;
;
function useSlots(doctorId, date) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSlots.useEffect": ()=>{
            if (!doctorId || !date) {
                setData([]);
                setLoading(false);
                return;
            }
            let mounted = true;
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSlots"])(doctorId, date).then({
                "useSlots.useEffect": (res)=>{
                    if (mounted) setData(res);
                }
            }["useSlots.useEffect"]).catch({
                "useSlots.useEffect": ()=>{}
            }["useSlots.useEffect"]).finally({
                "useSlots.useEffect": ()=>mounted && setLoading(false)
            }["useSlots.useEffect"]);
            return ({
                "useSlots.useEffect": ()=>{
                    mounted = false;
                }
            })["useSlots.useEffect"];
        }
    }["useSlots.useEffect"], [
        doctorId,
        date
    ]);
    return {
        data,
        loading
    };
}
}),
"[project]/frontend/apps/patient-portal/app/booking/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$hooks$2f$useSlots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/apps/patient-portal/lib/hooks/useSlots.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
;
;
function BookingPage() {
    const [doctorId, setDoctorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { data: slots, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$hooks$2f$useSlots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlots"])(doctorId, date);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                className: "text-2xl font-semibold mb-4",
                children: "Book a Doctor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                        placeholder: "Doctor ID",
                        value: doctorId,
                        onChange: (e)=>setDoctorId(e.target.value),
                        className: "p-2 border rounded"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                        type: "date",
                        value: date,
                        onChange: (e)=>setDate(e.target.value),
                        className: "p-2 border rounded"
                    }),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: "skeleton h-12 rounded"
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                        className: "space-y-2",
                        children: slots?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                                className: "p-3 border rounded flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        children: s.time
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                        onClick: ()=>router.push(`/booking/confirm?doctor=${doctorId}&slot=${s.id}&date=${date}`),
                                        className: "bg-blue-600 text-white px-3 py-1 rounded",
                                        children: "Select"
                                    })
                                ]
                            }, s.id))
                    })
                ]
            })
        ]
    });
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_09tv885._.js.map