import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'coretms.tecnomegastore.ec',
    }]
  },
};

export default nextConfig;
