const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'less-loader',
        ],
      },
    ],
  },
};

// webpack.config.js
// const CircularDependencyPlugin = require('circular-dependency-plugin');

// module.exports = {
//   entry: './src/index.js',
//   plugins: [
//     new CircularDependencyPlugin({
//       // exclude detection of files based on a RegExp
//       exclude: /a\.js|node_modules/,
//       // include specific files based on a RegExp
//       include: /dir/,
//       // add errors to webpack instead of warnings
//       failOnError: true,
//       // allow import cycles that include an asyncronous import,
//       // e.g. via import(/* webpackMode: "weak" */ './file.js')
//       allowAsyncCycles: false,
//       // set the current working directory for displaying module paths
//       cwd: process.cwd(),
//     }),
//   ],
// };
