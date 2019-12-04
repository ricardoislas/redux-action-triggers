
const path = require('path');

module.exports={

	entry: './src/app/index.js',
	
	output:{
		path: path.resolve(__dirname, 'dist/app/js'),
		filename: 'bundle.js',
		publicPath: 'dist/app/js'
	},

	devServer:{
		port:3000
	},

	module: {
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-react']
					}
				}
			}
		]
	}
}