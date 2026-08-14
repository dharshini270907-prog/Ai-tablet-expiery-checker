import { loadEnv, mergeConfig } from "vite";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ command, mode }) => {
  const isDev = command === "serve";

  // TanStack Start plugin (required for SSR / file-based routing)
  const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");

  // React plugin (JSX transform, fast refresh)
  const viteReact = (await import("@vitejs/plugin-react")).default;

  // Nitro — only at build time (server runtime for Cloudflare / Node)
  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    viteReact(),
  ];

  if (command === "build") {
    try {
      const { nitro } = await import("nitro/vite");
      plugins.push(nitro({ defaultPreset: "cloudflare-module" }));
    } catch {
      // nitro not installed — skip server bundling (dev-only usage is fine)
    }
  }

  // VITE_ env vars → import.meta.env.*
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const baseConfig = {
    define: envDefine,
    css: { transformer: "lightningcss" as const },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    plugins,
  };

  const devServer = isDev
    ? { server: { host: "::", port: 8080, strictPort: true } }
    : {};

  return mergeConfig(baseConfig, devServer);
});
