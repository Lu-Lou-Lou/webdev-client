import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites() {
    return [
      {
        source: "/courses/RS101/:path*",
        destination: "/courses/1234/:path*",
      },
    ];
  },
};

export default nextConfig;
