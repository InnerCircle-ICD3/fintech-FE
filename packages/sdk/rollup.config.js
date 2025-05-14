import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/payment-sdk.js",
    format: "umd",
    name: "PaymentSDK",
    exports: "default",
    globals: {
      qrcode: "QRCode",
    },
  },
  plugins: [
    typescript({
      declaration: true,
      declarationDir: "./dist/types",
      rootDir: "./src",
    }),
  ],
  external: ["qrcode"],
});
