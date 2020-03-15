const path = require('path');


module.exports = {
	mode: 'development',
	entry: {
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('..', __dirname, 'docs')
	}
}
