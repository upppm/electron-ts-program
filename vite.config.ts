import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

fs.rmSync('dist', { recursive: true, force: true }) // v14.14.0

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: {
          // Must be use absolute path, this is the restrict of Rollup
          preload: path.join(__dirname, 'electron/preload.ts'),
        },
      },
      // Enables use of Node.js API in the Renderer-process
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {},
    }),
  ],
  resolve: {
    alias
  },
})
