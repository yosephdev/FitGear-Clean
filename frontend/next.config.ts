import type { NextConfig } from "next";
import path from "path";

// Use a typed env object so we can use dot-access while keeping strict TS settings
const env = process.env as NodeJS.ProcessEnv & {
  NEXT_PUBLIC_API_BASE_URL?: string;
};
const backend = env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  async rewrites() {
    // If backend URL is provided, proxy API requests (and docs UIs)
    if (backend && /^https?:\/\//.test(backend)) {
      return [
        {
          source: "/api/:path*",
          destination: `${backend}/api/:path*`,
        },
        // Optional: proxy docs and redoc for API documentation
        {
          source: "/docs/:path*",
          destination: `${backend}/docs/:path*`,
        },
        {
          source: "/redoc/:path*",
          destination: `${backend}/redoc/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
