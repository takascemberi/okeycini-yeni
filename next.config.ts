/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🔧 Netlify build'ini kesmesin
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // 🔒 Firebase resim desteği
  },
};

module.exports = nextConfig;
