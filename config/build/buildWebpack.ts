import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === "development";

    return {
        mode: options.mode ?? "development",
        // entry: path.resolve(__dirname, 'src', 'index.tsx'),
        entry: options.paths.entry,
        output: {
            // path: path.resolve(__dirname, "build"),
            path: options.paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            // Указываем лоадера (важен порядок)
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
        devServer: isDev ? buildDevServer(options) : undefined,
    } 
}