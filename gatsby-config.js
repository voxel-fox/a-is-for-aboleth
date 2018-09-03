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
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Alegreya Sans:400', 'Alegreya:400,500,900']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        viewBox: false
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'A is for Aboleth',
        short_name: 'AisforAboleth',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/assets/images/icon.png'
      }
    },
    `gatsby-plugin-offline`
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: ``,
    //   }
    // },
  ]
}
