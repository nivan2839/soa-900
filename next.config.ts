import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   env: {
    OLLAMA_API: process.env.OLLAMA_API,
  },
};

export default nextConfig;
