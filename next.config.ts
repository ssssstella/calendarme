import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
         protocol: "https",
         hostname: "*.googleusercontent.com",
         port: "",
         pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "**",
     }
    ]
  }
};

export default nextConfig;
