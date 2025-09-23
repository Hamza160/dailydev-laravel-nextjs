import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns:[
            {
                hostname:"localhost",
                protocol:"http"
            },
            {
                hostname:"*",
                protocol:"https"
            }
        ]
    }
};

export default nextConfig;
