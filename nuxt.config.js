export default {
	mode: 'spa',
	router: {
		base: '/WebApps/'
	},
	head: {
		/**
		 * タイトルの変換処理
		 * @param {string} title 元のタイトル
		 */
		titleTemplate (title) {
			const rootTitle = 'WebApps';
			return title ? `${title} - ${rootTitle}` : rootTitle;
		},
		/** metaタグ */
		meta: [
			{ charset: 'UTF-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		]
	},
	pwa: {
		manifest: {
			name: 'Accup WebApps',
			lang: 'ja'
		}
	},
	buildModules: ['@nuxt/typescript-build'],
	modules: [
		'@nuxtjs/pwa'
	]
};