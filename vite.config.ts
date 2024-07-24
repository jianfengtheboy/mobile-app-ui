import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// vant 按需引入
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// gzip
import viteCompression from 'vite-plugin-compression'
// 按需引入
import AutoImport from 'unplugin-auto-import/vite'
// icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// viteVConsole
import viteVConsole from 'vite-plugin-vconsole'

import * as path from 'path'
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

const loadEnvByMode = (mode, env) => {
	return loadEnv(mode, process.cwd())[env]
}

export default defineConfig(({ mode }) => {
	const config = {
		base: './',
		plugins: [
			vue(),
			Icons({
				compiler: 'vue3',
				customCollections: {
					custom: FileSystemIconLoader(resolve('src/assets/icons'))
				}
			}),
			AutoImport({
				imports: ['vue', 'vue-router', 'pinia'],
				resolvers: [VantResolver()]
			}),
			Components({
				dts: true,
				resolvers: [
					VantResolver(),
					IconsResolver({
						prefix: 'icon',
						customCollections: ['custom']
					})
				]
			}),
			viteCompression({
				verbose: true,
				disable: false,
				deleteOriginFile: false,
				threshold: 10240,
				algorithm: 'gzip',
				ext: '.gz'
			}),
			viteVConsole({
				entry: path.resolve(__dirname, 'src/main.ts').replace(/\\/g, '/'),
				localEnabled: mode === 'development',
				enabled: mode === 'development',
				config: {
					maxLogNumber: 1000,
					theme: 'light'
				}
			})
		],
		build: {
			minify: 'terser' as 'terser',
			terserOptions: {
				compress: {
					drop_console: false,
					drop_debugger: false
				}
			},
			outDir: loadEnvByMode(mode, 'VITE_OUT_DIR')
		},
		resolve: {
			alias: {
				'@': resolve('src')
			},
			dedupe: ['vue']
		},
		server: {
			open: false,
			host: '0.0.0.0',
			port: 3000,
			proxy: {
				[`${loadEnvByMode(mode, 'VITE_BASE_API')}`]: {
					target: loadEnvByMode(mode, 'VITE_PROXY_URL'),
					changeOrigin: true,
					ws: true,
					rewrite: path => path.replace(new RegExp(`^${loadEnvByMode(mode, 'VITE_BASE_API')}`), '')
				}
			}
		}
	}

	return config
})
