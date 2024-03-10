const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'ts-loader'],
                exclude: /node_modules/
			},
			{
				test: /\.ttf$/,
				type: 'asset/resource'
			}
		]
	},
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
	plugins: [new MonacoWebpackPlugin()]
};