import createMDX from '@next/mdx';
import postgres from 'postgres';

// Set up the database connection
const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'allow',
});

// Next.js configuration
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  async redirects() {
    if (!process.env.POSTGRES_URL) {
      return [];
    }

    // Fetch redirects from the database
    const redirects = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    // Map the results into the expected format
    return redirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent: !!permanent,
    }));
  },
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    // Ignore the `canvas` module in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false, // Tell Webpack to ignore `canvas` in the browser
    };
    return config;
  },
};


const withMDX = createMDX({});

export default withMDX(nextConfig);
