import createMDX from "@next/mdx";
import remarkPrism from "remark-prism";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismAll from "rehype-prism-plus/all";
// NOTE: we no longer import @plaiceholder/next at top-level
// import withPlaiceholder from "@plaiceholder/next";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co", "images.unsplash.com", "res.cloudinary.com"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkPrism, remarkGfm],
    rehypePlugins: [rehypePrismAll, rehypeCodeTitles],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * Export an async function so we can attempt to dynamic-import
 * @plaiceholder/next safely. If the import fails (e.g. sharp missing),
 * fall back to an identity wrapper so the build won't crash.
 */
export default async function () {
  let withPlaiceholder = (cfg) => cfg; // fallback: identity

  try {
    const mod = await import("@plaiceholder/next");
    // the module may export default or the function itself
    withPlaiceholder = mod?.default ?? mod;
  } catch (err) {
    // don't fail the build — log so you can see why plaiceholder wasn't applied
    // Vercel build logs will show this message
    // eslint-disable-next-line no-console
    console.warn(
      "[next.config] Could not load @plaiceholder/next — continuing without it. Error:",
      err?.message ?? err
    );
  }

  // Apply wrappers (order matters: first plaiceholder, then MDX)
  return withMDX(withPlaiceholder(nextConfig));
}
