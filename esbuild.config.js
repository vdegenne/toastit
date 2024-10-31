import esbuild from 'esbuild'


await esbuild.build({
    entryPoints: ["out/index.js"],
    outfile: 'index.js',
    format: 'esm',
    treeShaking: true,
    bundle: true,
    minify: true,
    legalComments: 'external'
})