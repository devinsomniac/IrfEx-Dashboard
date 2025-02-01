import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', 
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**', 
        port: '',
        pathname: '**',
      },
    ],
    loader: "default",  
    domains: ['lh3.googleusercontent.com','e7.pngegg.com', 't3.ftcdn.net',"w0.peakpx.com","img.freepik.com"], 
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    RAPID_API: process.env.RAPID_API, 
  },
};

export default nextConfig;
