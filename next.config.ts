import type { NextConfig } from "next";

const isAliyunStaticExport = process.env.ALIYUN_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isAliyunStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
