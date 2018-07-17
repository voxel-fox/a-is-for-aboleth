const path = require(`path`)

module.exports = {
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
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        viewBox: false
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    }
    // `gatsby-plugin-manifest`,
    // `gatsby-plugin-offline`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: ``,
    //   }
    // },
  ]
}
