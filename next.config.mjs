/** @type {import('next').NextConfig} */
const isGhPages = process.env.NODE_ENV === 'production'
const basePath = isGhPages ? '/RadiantFit-1.0' : ''
const assetPrefix = isGhPages ? '/RadiantFit-1.0/' : ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
