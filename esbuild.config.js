import esbuild from 'esbuild';
import fs from 'fs/promises';

const customElementPlugin = {
	name: 'custom-element-transform',
	setup(build) {
		build.onLoad({filter: /\.js$/}, async (args) => {
			// Load the file
			const source = await fs.readFile(args.path, 'utf8');

			// Transform the source
			const transformedSource = source.replace(
				/customElement\('([^']+)'\)/g,
				(_, name) => `customElement('${name}-toastit')`,
			);

			return {
				contents: transformedSource,
				loader: 'js',
			};
		});
	},
};

await esbuild.build({
	entryPoints: ['lib/index.js'],
	outfile: 'index.js',
	format: 'esm',
	treeShaking: true,
	bundle: true,
	minify: true,
	legalComments: 'external',
	plugins: [customElementPlugin],
});

