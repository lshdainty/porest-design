import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  // 레포 루트에도 package-lock.json 이 있어 Next 가 루트를 잘못 짚는다 — site 를 루트로 못 박는다.
  turbopack: { root: import.meta.dirname },
};

export default withMDX(config);
