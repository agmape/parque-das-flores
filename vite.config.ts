import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Configuração independente da Lovable.
// - tanstackStart: SSR + roteamento por arquivos (src/routes)
// - nitro: gera a saída do servidor; na Vercel o preset "vercel" é detectado automaticamente
// - resolve.tsconfigPaths: alias "@/..." definido em tsconfig.json (suporte nativo do Vite 8)
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Entrada do servidor em src/server.ts (wrapper de erros de SSR).
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
