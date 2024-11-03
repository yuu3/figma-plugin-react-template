import fs from 'fs'
import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  root: "./src",
  plugins: [
    reactRefresh(),
    viteSingleFile(),
    {
      name: 'generate-manifest',
      apply: 'build',
      buildEnd() {
        const id = import.meta.env.VITE_MANIFEST_ID
        const manifest = fs.readFileSync('manifest.template.json', 'utf-8').replace(/\$\{PLUGIN_ID\}/g, id || '')

        fs.writeFileSync('manifest.json', manifest)
      },
    }
  ],
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "../dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
