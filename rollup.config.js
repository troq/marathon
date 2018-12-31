import typescript from 'rollup-plugin-typescript';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

const settings = {
	input: 'src/settings.js',
	output: {
		file: 'build/settings.js',
		format: 'iife',
	},
	plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
        'node_modules/react-is/index.js': ['isValidElementType'],
      },
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            "targets": "last 2 Chrome versions",
            "modules": false,
          },
        ],
        '@babel/react',
      ],
    }),
		css({ output: 'build/settings.css' }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

const popup = {
	input: 'src/popup.ts',
	output: {
		file: 'build/popup.js',
		format: 'iife',
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript(),
		css({ output: 'build/popup.css' }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

const eradicate = {
	input: 'src/eradicate.ts',
	output: {
		file: 'build/eradicate.js',
		format: 'iife',
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript(),
		css({ output: 'build/eradicate.css' }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

const eradicateReddit = {
	input: 'src/eradicateReddit.ts',
	output: {
		file: 'build/eradicateReddit.js',
		format: 'iife',
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript(),
		css({ output: 'build/eradicate.css' }),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

const intercept = {
	input: 'src/intercept.ts',
	output: {
		file: 'build/intercept.js',
		format: 'iife',
	},
	plugins: [typescript()],
};

export default [settings, eradicate, intercept, eradicateReddit, popup];
