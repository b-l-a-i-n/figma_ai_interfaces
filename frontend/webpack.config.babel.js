import {resolve as _resolve} from 'path';
import {buildWebpackConfig} from "./config/webpack/buildWebpackConfig.babel";

export default (env) => {
    const paths = {
        entry: _resolve(__dirname, 'src', 'index.jsx'),
        build: _resolve(__dirname, 'build'),
        html: _resolve(__dirname, 'public', 'index.html'),
        src: _resolve(__dirname, 'src')
    };
    const mode = env.mode || 'development';
    const port = env.port || 3000;
    const isDev = mode === 'development';
    const config  = buildWebpackConfig({
        paths,
        mode,
        isDev,
        port
    });
    return config
}