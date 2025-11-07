/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui', '@workspace/core', '@workspace/api'],
  serverExternalPackages: ['@prisma/client', '@workspace/database'],
};

export default nextConfig;
