/** @type {import('next').NextConfig} */

export default {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['3.bp.blogspot.com'], //make it 'your-domain.com'
  },
};
