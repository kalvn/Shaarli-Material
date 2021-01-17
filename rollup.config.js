import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import clean from 'postcss-clean';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
// import purgecss from '@fullhuman/postcss-purgecss';
import eslint from '@rollup/plugin-eslint';
import { terser } from "rollup-plugin-terser"; // minify JS

const config = {
  input: 'src/js/main.js',
  output: {
    file: 'material/dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      exclude: [
        'node_modules/**',
        'src/scss/**'
      ]
    }),
    process.env.NODE_ENV === 'production' ? terser() : null,
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
