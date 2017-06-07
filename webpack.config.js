/**
 *
 * Webpack Config
 * Handles configuration of the Webpack CLI.
 *
 */
const webpack = require( "webpack" );
const path = require( "path" );
const cssnano = require( "cssnano" );
const uglifyJS = require( "uglify-js" );
const fs = require( "fs" );
const exec = require( "child_process" ).exec;
const WebpackOnBuildPlugin = require( "on-build-webpack" );
const autoprefixer = require( "autoprefixer" );
const sassLoaders = [
    "file-loader?name=../css/[name].css",
    "postcss-loader",
    "sass-loader?sourceMap"
];


/**
 *
 * dev
 * Webpack config for development.
 * Compiles JavaScript & Sass.
 *
 */
config = {
    devtool: "source-map",


    resolve: {
        root: path.resolve( __dirname ),
        packageMains: [
            "webpack",
            "browserify",
            "web",
            "hobo",
            "main"
        ]
    },


    entry: {
        "app": path.resolve( __dirname, "source/js/app.js" )
    },


    output: {
        path: path.resolve( __dirname, "template/assets/js" ),
        filename: "[name].js"
    },


    module: {
        preLoaders: [
            // ESLint
            {
                test: /source\/js\/.*\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }
        ],


        loaders: [
            // Babel
            {
                test: /source\/js\/.*\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [
                        "es2015"
                    ]
                }
            },

            // Expose
            {
                test: /(hobo|hobo.build)\.js$/,
                loader: "expose?hobo"
            },

            // Expose jQuery
            // {
            //     test: /jquery\/dist.*\.js$/,
            //     loader: "expose?$!expose?jQuery"
            // },

            // Sass
            {
                test: /\.scss$/,
                loader: sassLoaders.join( "!" )
            }
        ]
    },


    postcss: [
        autoprefixer({
            browsers: [
                "last 2 versions"
            ]
        })
    ],


    sassLoader: {
        includePaths: [
            path.resolve( __dirname, "source/sass" )
        ]
    },


    plugins: [
        new WebpackOnBuildPlugin(function ( stats ) {

            // Post-build CSS compression and minification.
            fs.readFile( "./template/assets/css/app.css", "utf8", ( error, css ) => {
                const cssnanoOpts = {
                    discardComments: {
                        removeAll: true
                    }
                };

                cssnano.process(css, cssnanoOpts).then( (result) => {
                    fs.writeFile( "./template/assets/css/app.min.css", result);
                });
            });

            // Post-build JS compression and minification.
            fs.readFile( "./template/assets/js/app.js", "utf8", ( error, js ) => {
                const uglifyOpts = {
                    compress: {
                        // dead_code: true,
                        global_defs: {
                            DEBUG: false
                        }
                    },
                    inSourceMap: "./template/assets/js/app.js.map",
                    outSourceMap: "./template/assets/js/app.min.js.map"
                };

                const minified = uglifyJS.minify([ "./template/assets/js/app.js" ], uglifyOpts);

                fs.writeFile( "./template/assets/js/app.min.js", minified.code);
                fs.writeFile( "./template/assets/js/app.min.js.map", minified.map);
            });

        }),

        new webpack.ProvidePlugin({
            Promise: "exports?global.Promise!es6-promise",
            fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
        }),

    ]
};



module.exports = [
    config
];