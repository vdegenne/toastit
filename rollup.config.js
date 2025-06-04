import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {minifyTemplateLiterals} from 'rollup-plugin-minify-template-literals';

/** @type {import('rollup').RollupOptions[]} */
export default [
	{
		input: './lib/index.js',
		output: {file: './dist/toastit.min.js', format: 'iife', name: 'toast'},
		plugins: [
			nodeResolve(),
			minifyTemplateLiterals(),
			terser({format: {comments: false}}),
		],
	},
	{
		input: './lib/esm.js',
		output: {file: './dist/toastit.esm.min.js', format: 'esm'},
		plugins: [
			nodeResolve(),
			minifyTemplateLiterals(),
			terser({format: {comments: false}}),
		],
	},
];
