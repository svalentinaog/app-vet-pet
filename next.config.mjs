/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: 'sass-embedded',
  },
};

export default nextConfig;
