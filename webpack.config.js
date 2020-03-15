const path = require('path');


module.exports = {
	mode: 'production',
	entry: {
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('..', __dirname, 'docs')
	}
}
