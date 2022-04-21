const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    mode: 'production',
    entry: {
        extension: path.resolve(__dirname, 'src', 'extension.ts'),
        'extension-injector': path.resolve(__dirname, 'src', 'extension-injector.ts'),
        'main': path.resolve(__dirname, 'src', 'scss', 'main.scss'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'css/',
                            name: '[name].min.css',
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader'
            },
        ],
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
    ],
    optimization: {
        minimize: false
    },
    watchOptions:
        process.env.WSL_DISTRO_NAME
            ? {
                ignored: '/node_modules/',
                aggregateTimeout: 300,
                poll: 100,
            }
            : {},
};
