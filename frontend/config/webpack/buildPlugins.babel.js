import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export function buildPlugins({paths}) {
    return [
        new HtmlWebpackPlugin({
            template: paths.html
        }),
        new webpack.ProgressPlugin()
    ]
}