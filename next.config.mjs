/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fcbarcelona.com",
      },
      {
        protocol: "https",
        hostname: "fcbarcelona-static-files.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
