/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
                port: '', 
                pathname: '/**', 
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/sitemap.xml/route",
            },
        ];
    },
};

export default nextConfig;
