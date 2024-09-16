module.exports = {
    mode: 'development', // Adjust to 'production' for optimized builds
    target: 'node', // Specify Node.js as the target environment
    entry: './app.js', // Your main entry point file
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist' // Output directory
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']   
   // Enables ES module transpilation
            }
          }
        }
      ]
    }
  };