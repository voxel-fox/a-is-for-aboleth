import Typography from 'typography'

const options = {
  googleFonts: [
    {
      name: `Alegreya Sans`,
      styles: [`400`, `400i`, `700`, `700i`]
    },
    {
      name: `Alegreya`,
      styles: [`400`, `400i`, `700`, `700i`]
    }
  ],
  baseFontSize: `16px`,
  baseLineHeight: 1.4,
  headerColor: `white`,
  bodyColor: `white`,
  blockMarginBottom: 0.75,
  headerFontFamily: [`Alegreya Sans`, `sans-serif`],
  bodyFontFamily: [`Alegreya`, `sans-serif`]
}

const typography = new Typography(options)

export default typography
