const withLess = require("@zeit/next-less");
const withCss = require('@zeit/next-css');
const webpack = require('webpack');
let config = {
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    } else {
      // 提取公共模块
      !dev && (config.optimization.splitChunks.cacheGroups.commons.minChunks = 2);
      // 暂时没有用到Moment 排除掉
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    }

    return config;
  },
  distDir: 'build',
};

config = withCss(config);

config = withLess(
  Object.assign({}, config, {
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[local]__[hash:base64:5]',
      importLoaders: 1,
      ignoreOrder: true, // Enable to remove warnings about conflicting order
    },
  })
);

module.exports = config