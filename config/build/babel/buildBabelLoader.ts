import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
    const isDev = options.mode === "development";
    const isProd = options.mode === "production";

    const plugins = [];

    if (isProd) {
        plugins.push(
            [
                removeDataTestIdBabelPlugin,
                {
                    props: ['data-testid'],
                }
            ]
        );
    }
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            // options можно хранить здесь, а можно в отдельном файле babel.config.json
            options: {
                presets: [
                    '@babel/preset-env',
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react", 
                        {
                            "runtime": isDev ? "automatic" : "classic",
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined,
            }
        }
    }
}