/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@tanstack/query-core"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
