import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.calixto.ar" },
      { protocol: "https", hostname: "www.cresi.com.ar" },
    ],
  },
};

export default nextConfig;
