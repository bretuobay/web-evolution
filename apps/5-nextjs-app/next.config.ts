// apps/5-nextjs-app/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wees/database', '@wees/shared-types', '@web-evolution/design-system'],
};

export default nextConfig;
