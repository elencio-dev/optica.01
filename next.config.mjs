/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
                port: '', // Deixe vazio se não houver porta
                pathname: '/**', // Permite todos os caminhos
            },
        ],
    },
};

export default nextConfig;
