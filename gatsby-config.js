const path = require(`path`);

module.exports = {
  siteMetadata: {
    siteUrl: `https://a-is-for-aboleth.netlify.com`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.join(__dirname, `data`)
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        omitGoogleFont: true,
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Alegreya Sans:400,700", "Alegreya:400,500,700,900"]
        }
      }
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        icon: true,
        viewBox: false
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "A is for Aboleth",
        short_name: "AisforAboleth",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#ffffff",
        display: "minimal-ui",
        icon: "src/assets/images/icon.png"
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-131799462-1"
      }
    },
    `gatsby-plugin-sitemap`
  ]
};
