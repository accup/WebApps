const path = require('path');


module.exports = {
	entry: {
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('..', __dirname, 'docs')
	}
}
