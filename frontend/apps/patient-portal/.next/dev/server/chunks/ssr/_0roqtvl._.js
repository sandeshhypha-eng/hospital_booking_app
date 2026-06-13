module.exports = [
"[project]/frontend/apps/patient-portal/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/apps/patient-portal/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function LoginPage() {
    const [phoneOrEmail, setPhoneOrEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$apps$2f$patient$2d$portal$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])({
                identifier: phoneOrEmail
            });
            // redirect to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err?.message || 'Login failed');
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto mt-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold mb-4",
                children: "Sign in"
            }, void 0, false, {
                fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: phoneOrEmail,
                        onChange: (e)=>setPhoneOrEmail(e.target.value),
                        placeholder: "Phone or email",
                        className: "w-full p-3 border rounded"
                    }, void 0, false, {
                        fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: loading,
                        className: "w-full bg-blue-600 text-white p-3 rounded",
                        children: loading ? 'Sending...' : 'Send OTP / Login'
                    }, void 0, false, {
                        fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
                        lineNumber: 29,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/apps/patient-portal/app/(auth)/login/page.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0roqtvl._.js.map