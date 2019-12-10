const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withSass(
  withCSS({
    webpack: function(config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]"
          }
        }
      });

      // config.resolve.alias["reducers"] = join(
      //   __dirname,
      //   "redux-flow",
      //   "reducers"
      // );
      return config;
    },
    env: {
      BACKEND_URL: "http://localhost:4000"
      // BACKEND_URL:
      //   process.env.NODE_ENV === "production"
      //     ? "https://simplenoteapi.becoder.com.br"
      //     : process.env.NODE_ENV === "development"
      //     ? "http://localhost:4000"
      //     : "https://simplenotedevapi.becoder.com.br"
    }
  })
);
