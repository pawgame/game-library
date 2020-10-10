const gulp = require('gulp');
const path = require('path');
const del = require('del');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');

const resolvePath = (name) => {
    return path.resolve(__dirname, name);
};
const onwarn = (warning) => {
    // Silence circular dependency warning for moment package
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    console.warn(`(!) ${warning.message}`);
};

const dirBuild = resolvePath('lib');

gulp.task('clean', () => {
    return del([dirBuild], { force: true });
});

gulp.task('build', async () => {
    const bundle = await rollup.rollup({
        input: resolvePath('./src/index.ts'),
        plugins: [typescript()],
        onwarn,
    });

    await bundle.write({
        file: `${dirBuild}/index.js`,
        format: 'esm',
    });
});

gulp.task('default', gulp.series('clean', 'build'));
