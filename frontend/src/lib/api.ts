export function apiBaseUrl() {
  // In Next.js client components, env vars are embedded at build time
  const env = process.env['NEXT_PUBLIC_API_BASE_URL'];
  if (env && env.trim().length > 0) return env.replace(/\/$/, "");
  return "/api";
}

export function apiUrl(path: string) {
  const base = apiBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
