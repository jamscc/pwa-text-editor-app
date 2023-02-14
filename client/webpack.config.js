const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

const plugins = [
  new HtmlWebpackPlugin({ template: './index.html', favicon: './favicon.ico', title: 'text editor' }),
  new WebpackPwaManifest({
    start_url: './',
    name: 'jate App',
    background_color: '#d3d3d3',
    description: 'text editor',
    publicPath: './',
    fingerprints: false,
    icons: [
      { src: './src/images/logo.png', sizes: '96x96', destination: './assets/icons' },
      { src: './src/images/logo.png', sizes: '192x192', destination: './assets/icons' },
      { src: './src/images/logo.png', sizes: '512x512', destination: './assets/icons' }
    ]
  }),
  new InjectManifest({ swSrc: './src-sw.js', swDest: 'src-sw.js' })
];

const rc = new RegExp(`.css$`, `i`);
const rj = new RegExp(`.js$`, `i`);
const rmj = new RegExp(`.mjs$`, `i`);
const rpn = new RegExp(`.png$`, `i`);
const rjp = new RegExp(`.jpg$`, `i`);
const rje = new RegExp(`.jpeg$`, `i`);
const rg = new RegExp(`.gif$`, `i`);
const nm = new RegExp('node_modules');

const imgRl = { test: rjp || rpn || rg || rje, type: 'asset/resource' };
const jsRl = {
  test: rj || rmj,
  exclude: nm,
  use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
};
const cssRl = { test: rc, use: ['style-loader', 'css-loader'] };

const md = [jsRl, imgRl, cssRl,];
const dir = __dirname;

const eo = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(dir, 'dist'),
  },
  plugins: plugins,
  module: { rules: md },
}

module.exports = () => { return eo };