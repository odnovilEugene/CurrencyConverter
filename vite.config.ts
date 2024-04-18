import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  base: "/CurrencyConverter/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "./src/")}`,
      "components": `${path.resolve(__dirname, "./src/components/")}`,
      "public": `${path.resolve(__dirname, "./public/")}`,
      "pages": `${path.resolve(__dirname, "./src/pages")}`,
      "types": `${path.resolve(__dirname, "./src/types")}`,
      "styles": `${path.resolve(__dirname, "./src/styles")}`,
      "mock": `${path.resolve(__dirname, "./src/mock")}`
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: function (name, filename, css) {
        const i = css.indexOf("." + name);
        const line = css.substr(0, i).split(/[\r\n]/).length;
        const file = path.basename(filename).replace('.module', '').replace('.scss', '');

        return file + "_" + line + "_" + name;
      },
    }
  }
})
