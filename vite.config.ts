import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "./demo",
	server: {
		open: true,
	},
	build: {
		outDir: "../dist-demo",
	},
	resolve: {
		alias: {
			"@xumi/rhooks": resolve(__dirname, "./src"),
		},
	},
});
