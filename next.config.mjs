/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: 'sass-embedded',
  },
  experimental: {
    middleware: true,
  },
  images:{
    domains: ['res.cloudinary.com']
  }
};

export default nextConfig;
