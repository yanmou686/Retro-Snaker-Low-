const path = require("path");
//引入html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //指定入口文件
  entry: "./src/index.ts",

  //指定打包文件所在目录
  output: {
    //指定打包文件所在目录
    path: path.resolve(__dirname, "dist"),
    //打包后文件名
    filename: "bundle.js",

    //告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false,
    },
  },
  mode: "production",
  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        //test指定规则生效的文件
        test: /\.ts$/,
        //要使用的loader
        use: [
          {
            //指定加载器
            loader: "babel-loader",
            options: {
              //设置预定义环境
              presets: [
                [
                  //指定环境的插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的目标浏览器
                    targets: {
                      chrome: "107",
                      ie: "11",
                    },
                    //指定corejs的版本
                    corejs: "3",
                    //使用corejs的方式
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        //要排除的文件
        exclude: /node-modules/,
      },

      //设置less文件的处理
      {
        test: /\.less$/,
        use: [
          //执行顺序从下往上
          "style-loader",
          "css-loader",
          //引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  //配置webpack插件(自动生成html文件并且引入相关资源)
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  //用来设置引用的模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
