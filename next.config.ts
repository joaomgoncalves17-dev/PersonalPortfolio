import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Página 404 própria (app/global-not-found.tsx), já que o layout principal vive em app/[lang].
    globalNotFound: true,
  },
};

export default nextConfig;
