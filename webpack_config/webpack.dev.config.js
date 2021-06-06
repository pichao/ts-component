const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commenConfigFunc = require('./webpack.common.config.js');

module.exports = (env, argv) => {
    const commenConfig = commenConfigFunc(env, argv);
    return {
        ...commenConfig,
        mode: 'development',
        devtool: 'source-map',
        plugins: [...commenConfig.plugins, new BundleAnalyzerPlugin()],
        devServer: {
            host: '0.0.0.0', // 防止仅仅是localhost可以访问但是ip不可以访问
            compress: true,
            port: 9002,
            historyApiFallback: true, // 开发环境防治路由404
            proxy: {
                '/api': {
                    target: 'https://corona.lmao.ninja',
                    changeOrigin: true,
                    http2: true,
                    pathRewrite: { '^/api': '' },
                    // secure: false,
                },
            },
        },
    };
};
