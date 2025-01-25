import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {minifyTemplateLiterals} from 'rollup-plugin-minify-template-literals';

/** @type {import('rollup').RollupOptions} */
export default {
	input: './lib/index.js',
	output: {file: 'index.js', format: 'es'},
	plugins: [
		nodeResolve(),
		minifyTemplateLiterals(),
		terser({format: {comments: false}}),
	],
};
