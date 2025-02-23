const config = {
    plugins: [
      require("cssnano")({plugins: [require("autoprefixer")], preset: require("cssnano-preset-lite")})
    ]
  }
  
module.exports = config