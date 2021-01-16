import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser"; // minify JS
import postcss from 'rollup-plugin-postcss';
import clean from 'postcss-clean';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
// import purgecss from '@fullhuman/postcss-purgecss';
import eslint from '@rollup/plugin-eslint';

const config = {
  input: 'src/js/index.js',
  output: {
    file: 'material/dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint(),
    // terser(),
    postcss({
      extract: path.resolve('material/dist/bundle.css'),
      plugins: [
        // purgecss({
        //   content: ['material/*.html']
        // }),
        autoprefixer(),
        clean()
      ]
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    copy({
      targets: [
        { src: 'src/assets/fonts', dest: 'material/dist' },
        { src: 'src/assets/img', dest: 'material/dist' },
        { src: 'node_modules/bootstrap/dist/fonts/*', dest: 'material/dist/fonts' }
      ]
    })
  ],
  watch: {
    exclude: 'node_modules/**'
  }
};

export default config;
