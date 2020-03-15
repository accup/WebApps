const path = require('path');


module.exports = {
	mode: 'production',
	entry: {
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('..', __dirname, 'docs')
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			}
		]
	}
}
