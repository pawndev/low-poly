var path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'low-poly.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                // query: {
                    //  presets: ['es2015']
                // }
            }
        ]
    }
};