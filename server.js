const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

config.plugins.push(new webpack.ProgressPlugin({ profile: false }));

function runServer(webpackConfig) {
    const serverConfig = {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        port: 7000,
        host: '0.0.0.0',
        inline: true,
        stats: {
            colors: true,
            chunks: false,
        },
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };

    const server = new WebpackDevServer(webpack(webpackConfig), serverConfig);

    return server.listen(7000, '0.0.0.0', (err, result) => {
        if (err) console.log(err, result);
        console.log('WebpackDevServer listening on 0.0.0.0:7000...');
    });
}

module.exports = runServer;

if (require.main === module) {
    console.log(
        'Starting compilation... (if this step is taking too long, consider using: yarn dev_bundle [bundle_name].)',
    );
    runServer(config);
}
