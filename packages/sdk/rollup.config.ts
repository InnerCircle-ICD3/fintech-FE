import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.es.js", format: "es" },
      { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.umd.js", format: "umd", name: "passion-pay-sdk" },
    ],
    plugins: [typescript()],
    external: [],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
]);
