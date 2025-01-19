/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
if (process.env.NEXT_PUBLIC_NODE_ENV === "prod") {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  };
}

export default nextConfig;
