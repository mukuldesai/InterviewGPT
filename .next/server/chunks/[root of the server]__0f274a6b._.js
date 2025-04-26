module.exports = {

"[project]/.next-internal/server/app/api/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(request) {
    const rapidApiKey = process.env.RAPID_API_KEY;
    const rapidApiHost = 'jsearch.p.rapidapi.com';
    if (!rapidApiKey) {
        console.error('[Error] RAPID_API_KEY not set.');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(generateMockJobs(15), {
            status: 200
        });
    }
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query') || 'software developer';
        const location = searchParams.get('location') || '';
        const experience = searchParams.get('experience');
        const jobType = searchParams.get('jobType');
        const datePosted = searchParams.get('datePosted');
        const minSalary = searchParams.get('minSalary');
        const queryParams = new URLSearchParams();
        queryParams.append('query', `${query} ${location}`.trim());
        if (experience) queryParams.append('experience', experience);
        if (jobType) queryParams.append('employment_type', jobType);
        if (datePosted) queryParams.append('date_posted', datePosted);
        if (minSalary) queryParams.append('salary_min', minSalary);
        const apiUrl = `https://${rapidApiHost}/search?${queryParams.toString()}`;
        console.log(`[Jobs API] Fetching from: ${apiUrl}`);
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': rapidApiHost
            },
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            console.error(`[Jobs API] Request failed: ${response.status}`);
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('[Jobs API] Data received:', data);
        if (!data?.data || data.data.length === 0) {
            console.warn('[Jobs API] No jobs found from API, returning mock jobs.');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(generateMockJobs(12), {
                status: 200
            });
        }
        const jobListings = data.data.map((item)=>({
                job_id: item.job_id || `job-${Math.random().toString(36).substring(2, 9)}`,
                employer_name: item.employer_name || 'Unknown Company',
                employer_logo: item.employer_logo || null,
                job_employment_type: item.job_employment_type || 'FULLTIME',
                job_title: item.job_title || 'Job Position',
                job_description: item.job_description || 'No description provided',
                job_apply_link: item.job_apply_link || '#',
                job_city: item.job_city || 'Remote',
                job_country: item.job_country || 'United States',
                job_posted_at_timestamp: item.job_posted_at_timestamp || Math.floor(Date.now() / 1000),
                job_min_salary: item.job_min_salary || undefined,
                job_max_salary: item.job_max_salary || undefined
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(jobListings, {
            status: 200
        });
    } catch (error) {
        console.error('[Jobs API] Error fetching job listings:', error.message || error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(generateMockJobs(12), {
            status: 200
        });
    }
}
// Mock data generator for fallback
function generateMockJobs(count) {
    const jobTitles = [
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'DevOps Engineer',
        'Data Scientist',
        'Product Manager',
        'UX Designer',
        'QA Engineer',
        'Project Manager'
    ];
    const companies = [
        'Tech Innovations',
        'Digital Solutions',
        'CodeCraft',
        'DataWorks',
        'CloudScale',
        'WebFusion',
        'AppNexus',
        'Software Systems',
        'DevCorp',
        'InnovateTech'
    ];
    const cities = [
        {
            city: 'San Francisco',
            country: 'USA'
        },
        {
            city: 'New York',
            country: 'USA'
        },
        {
            city: 'Boston',
            country: 'USA'
        },
        {
            city: 'Seattle',
            country: 'USA'
        },
        {
            city: 'Austin',
            country: 'USA'
        },
        {
            city: 'London',
            country: 'UK'
        },
        {
            city: 'Toronto',
            country: 'Canada'
        },
        {
            city: 'Berlin',
            country: 'Germany'
        }
    ];
    const employmentTypes = [
        'FULLTIME',
        'PARTTIME',
        'CONTRACTOR',
        'INTERN'
    ];
    const descriptions = [
        'Exciting opportunity to work with modern technologies.',
        'Collaborate with cross-functional teams to deliver projects.',
        'Join a company focused on innovation and growth.',
        'Work with agile teams building next-gen applications.'
    ];
    const logos = [
        'https://logo.clearbit.com/google.com',
        'https://logo.clearbit.com/microsoft.com',
        'https://logo.clearbit.com/amazon.com',
        'https://logo.clearbit.com/apple.com',
        'https://logo.clearbit.com/facebook.com',
        null
    ];
    return Array.from({
        length: count
    }, (_, i)=>{
        const location = cities[Math.floor(Math.random() * cities.length)];
        const daysAgo = Math.floor(Math.random() * 14);
        const postedTimestamp = Math.floor(Date.now() / 1000) - daysAgo * 86400;
        return {
            job_id: `job-${i}-${Math.random().toString(36).substring(2, 9)}`,
            employer_name: companies[Math.floor(Math.random() * companies.length)],
            employer_logo: logos[Math.floor(Math.random() * logos.length)],
            job_employment_type: employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
            job_title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
            job_description: descriptions[Math.floor(Math.random() * descriptions.length)],
            job_apply_link: 'https://example.com/apply',
            job_city: location.city,
            job_country: location.country,
            job_posted_at_timestamp: postedTimestamp,
            job_min_salary: Math.floor(Math.random() * 50 + 50) * 1000,
            job_max_salary: Math.floor(Math.random() * 50 + 100) * 1000
        };
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0f274a6b._.js.map