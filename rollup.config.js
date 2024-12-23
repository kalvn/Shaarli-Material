import path from 'path';
import fs from 'fs';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'postcss';
import clean from 'postcss-clean';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import sass from 'rollup-plugin-sass';
import css from 'rollup-plugin-css-only';
import { minify } from 'csso';

const config = {
  input: 'src/js/main.js',
  output: {
    file: 'material/dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    css({
      output: function (styles) {
        fs.writeFileSync(path.join('material', 'dist', 'lib.css'), minify(styles).css);
      }
    }),
    sass({
      output: true,
      processor: css => postcss([clean])
        .process(css, { from: undefined })
        .then(result => result.css)
    }),
    process.env.NODE_ENV === 'production' ? terser() : null,
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
