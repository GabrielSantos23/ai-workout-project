import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["v2.exercisedb.io"],
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb", // Define o limite de tamanho do corpo da requisição
    },
    externalResolver: true,
  },
};

export default nextConfig;
