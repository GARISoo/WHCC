import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';

export default {
    input: './src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named'
        },
    ],
    plugins: [
        external(),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        scss({
            include: '**/*.scss',
        }),
        image(),
        terser(),
    ],
};