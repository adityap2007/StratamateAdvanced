/** @type {import('next').NextConfig} */
// Trigger new deployment
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', '@supabase/supabase-js']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    config.resolve.alias['@'] = __dirname;
    return config
  }
}

module.exports = nextConfig 