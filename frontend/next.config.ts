import type { NextConfig } from "next";
import path from "path";

const backend = process.env["NEXT_PUBLIC_API_BASE_URL"]?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  async rewrites() {
    // If a backend URL is provided, proxy frontend /api/* to backend /api/*
    if (backend && /^https?:\/\//.test(backend)) {
      return [
        {
          source: "/api/:path*",
          destination: `${backend}/api/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
