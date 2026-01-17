// apps/5-nextjs-app/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wees/database', '@wees/shared-types', '@wees/design-system'],
};

export default nextConfig;
