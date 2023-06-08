const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const PreactRefreshPlugin = require("@prefresh/webpack");

const API_PROXY_URL = `http://localhost:6767`;

const API_URL = process.env.API_URL || "";
const NODE_ENV = process.env.NODE_ENV || "development";

const BABEL_CONFIG = {
  presets: [
    ["@babel/preset-typescript"],
    ["@babel/preset-modules", { loose: true }]
  ],
  plugins: [
    ["babel-plugin-macros"],
    [process.env.NODE_ENV !== "production" && "@prefresh/babel-plugin"],
    ["@babel/plugin-syntax-dynamic-import"],
    [
      "babel-plugin-transform-jsx-to-htm",
      {
        import: {
          module: "htm/preact",
          export: "html"
        }
      }
    ]
  ].filter(Boolean)
};

module.exports = {
  entry: "./src/client/client.jsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
    alias: {
      "react-native": "react-native-web",
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  module: {
    rules: [
      {
        // This is to support our `graphql` dependency, they expose a .mjs bundle instead of .js
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        // Pre-compile graphql strings.
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.[tj]sx?$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "source-map-loader"
      },
      {
        test: /\.[tj]sx?$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: BABEL_CONFIG
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: "./src/client/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      "process.env.API_URL": JSON.stringify(API_URL)
    }),
    new webpack.SourceMapDevToolPlugin(),
    new PreactRefreshPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: API_PROXY_URL
      }
    }
  }
};
