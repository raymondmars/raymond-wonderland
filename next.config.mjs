/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/ielts-writing-ai-examiner",
        destination: "/tools/ielts/score",
      },
    ];
  }
};


export default nextConfig;
