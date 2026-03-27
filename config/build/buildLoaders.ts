import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            { 
                loader: '@svgr/webpack', 
                options: { 
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                } 
                            }
                        ]
                    }
                } 
            }
        ],
    };


    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
            }
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,

            // Translates CSS into CommonJS
            // "css-loader",
            cssLoaderWithModules,

            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    // TS-LOADER чистый (отвечает за компиляцию кода через tsc)
    // const tsLoader = {
    //     // Название тех файлов, которые хотим обрабатывать (.ts и .tsx)
    //     // ts-loader умеет работать с JSX
    //     // Если бы мы не использовали тайпскрипт: нужен был бы babel-loader и его нужно было бы настроить
    //     // для того чтобы обрабатывать JSX
    //     test: /\.tsx?$/,
    //     // Назваение лоадера
    //     use: "ts-loader",
    //     // Не обрабатываем эту папку
    //     exclude: /node_modules/,
    // };

    // TS-LOADER с transpileOnly для ускорения сборки и React-Refresh
    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                }
            }
        ],
    };

    // Компиляция кода будет идти через babel
    // const babelLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: "babel-loader",
    //         // options можно хранить здесь, а можно в отдельном файле babel.config.json
    //         options: {
    //             presets: [
    //                 '@babel/preset-env',
    //                 "@babel/preset-typescript",
    //                 [
    //                     "@babel/preset-react", 
    //                     {
    //                         "runtime": isDev ? "automatic" : "classic",
    //                     }
    //                 ]
    //             ]
    //         }
    //     }
    // }
    const babelLoader = buildBabelLoader(options);

    return [
        assetLoader, 
        scssLoader, 
        // tsLoader, 
        babelLoader,
        svgrLoader
    ];
}