/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { InputPluginOption, RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/**
 * ${pkg.name} ${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`.trim();

const options: RollupOptions =
{
    input: './src/index.ts',
    output: [
        {
            banner,
            file: './dist/umd/index.js',
            format: 'umd',
            sourcemap: true,
            name: "MULTIVECTORS",
        },
        {
            banner,
            file: './dist/umd/index.min.js',
            format: 'umd',
            sourcemap: true,
            name: "MULTIVECTORS",
            plugins: [terser()]
        },
        {
            banner,
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            name: 'MULTIVECTORS'
        },
        {
            banner,
            file: './dist/esm/index.mjs',
            format: 'esm',
            sourcemap: true
        },
        {
            banner,
            file: './dist/esm/index.min.mjs',
            format: 'esm',
            sourcemap: true,
            plugins: [terser()]
        },
        {
            banner,
            file: './dist/system/index.js',
            format: 'system',
            sourcemap: true
        },
        {
            banner,
            file: './dist/system/index.min.js',
            format: 'system',
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [
        external() as unknown as InputPluginOption,
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' })
    ]
};

export default [
    options,
    {
        input: './dist/esm/types/src/index.d.ts',
        output: [{ file: pkg.types, format: "esm" }],
        plugins: [dts()],
    }
];
