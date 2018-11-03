const path = require('path');

module.exports = {
    entry: './app/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'app/scripts'),
        filename: 'bundle.js'
    },
    mode: 'development'
}