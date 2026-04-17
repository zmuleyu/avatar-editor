import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  webpack: (cfg) => {
    cfg.resolve.fallback = { ...cfg.resolve.fallback, fs: false };
    return cfg;
  },
};

export default config;
