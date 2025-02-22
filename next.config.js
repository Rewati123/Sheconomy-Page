/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "wj5bva861nimcosu.public.blob.vercel-storage.com", // अपने Blob URL का hostname डालो
      },
    ],
  },
};

module.exports = nextConfig;
