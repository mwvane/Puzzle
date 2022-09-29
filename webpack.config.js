const path = require('path')

module.exports = env => {
    return {
        mode: 'development',
        devtool: 'source-map',
        entry: './app.js',
        output: {
            filename: 'build.js',
            path: path.join(__dirname, './dist/build.js')
        },
    }
}