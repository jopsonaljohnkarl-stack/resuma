import type { ViteUserConfig } from "vitest/config";
import type { VitestEnvironment } from "vitest/node";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const workspaceRoot = fileURLToPath(new URL(".", import.meta.url));
const setupFile = fileURLToPath(new URL("./vitest.setup.ts", import.meta.url));

const rootPackageJsonPath = new URL("./package.json", import.meta.url);
const rootPackageJson = JSON.parse(readFileSync(rootPackageJsonPath, "utf-8")) as { version: string | undefined };
const appVersion = JSON.stringify(rootPackageJson.version ?? "0.0.0");

type VitestProjectOptions = {
	name: string;
	dirname: string;
	environment?: VitestEnvironment;
	plugins?: ViteUserConfig["plugins"];
};

export const createVitestProjectConfig = ({
	name,
	dirname,
	environment = "node",
	plugins = [],
}: VitestProjectOptions) =>
	defineConfig({
		root: dirname,
		envDir: workspaceRoot,
		resolve: { tsconfigPaths: true },
		define: {
			__APP_VERSION__: appVersion,
		},
		plugins,
		test: {
			name,
			environment,
			environmentOptions: {
				happyDOM: {
					settings: {
						disableJavaScriptFileLoading: true,
						disableCSSFileLoading: true,
						navigation: {
							disableMainFrameNavigation: true,
							disableChildFrameNavigation: true,
							disableChildPageNavigation: true,
						},
					},
				},
			},
			setupFiles: [setupFile],
			include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
			exclude: ["node_modules", "dist", ".output", "coverage", "reports"],
			pool: "threads",
			isolate: false,
			passWithNoTests: true,
			coverage: {
				provider: "v8",
				reportsDirectory: "coverage",
				reporter: ["text", "text-summary", "json-summary", "json", "lcov", "html"],
				include: ["src/**/*.{ts,tsx}"],
				exclude: ["src/**/*.{test,spec}.*", "src/**/*.d.ts", "src/routeTree.gen.ts"],
				reportOnFailure: true,
			},
		},
	});
