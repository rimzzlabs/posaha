/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com', protocol: 'https' },
      { hostname: 'picsum.photos', protocol: 'https' },
      { hostname: 'loremflickr.com', protocol: 'https' },
      { hostname: 'via.placeholder.com', protocol: 'https' },
    ],
  },
}

export default nextConfig
