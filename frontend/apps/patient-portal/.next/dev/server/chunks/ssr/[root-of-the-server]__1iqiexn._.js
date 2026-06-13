module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/frontend/apps/patient-portal/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
const BASE = process.env.NEXT_PUBLIC_API_URL || '';
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
"[project]/frontend/apps/patient-portal/lib/hooks/useBookings.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookings",
    ()=>useBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/apps/patient-portal/lib/api.ts [app-rsc] (ecmascript)");
;
;
function useBookings(patientId, status) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        setLoading(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookings"])(patientId, status).then((res)=>{
            if (mounted) setData(res);
        }).catch(()=>{}).finally(()=>mounted && setLoading(false));
        return ()=>{
            mounted = false;
        };
    }, [
        patientId,
        status
    ]);
    return {
        data,
        loading
    };
}
}),
"[project]/frontend/apps/patient-portal/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$hooks$2f$useBookings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/apps/patient-portal/lib/hooks/useBookings.tsx [app-rsc] (ecmascript)");
;
;
function DashboardPage() {
    const { data, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$hooks$2f$useBookings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useBookings"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold mb-4",
                children: "My Appointments"
            }, void 0, false, {
                fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-12 skeleton rounded"
                    }, void 0, false, {
                        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-12 skeleton rounded"
                    }, void 0, false, {
                        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-3",
                children: data?.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "p-3 border rounded flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: [
                                            "Dr. ",
                                            b.doctorName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                                        lineNumber: 21,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            b.date,
                                            " • ",
                                            b.slot
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                                        lineNumber: 22,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                                lineNumber: 20,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold",
                                children: b.status
                            }, void 0, false, {
                                fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        ]
                    }, b.id, true, {
                        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                        lineNumber: 19,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/apps/patient-portal/app/dashboard/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/apps/patient-portal/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/apps/patient-portal/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1iqiexn._.js.map