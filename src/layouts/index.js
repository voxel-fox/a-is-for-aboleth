import React from 'react'
import { injectGlobal } from 'emotion'
import 'typeface-alegreya'
import 'typeface-alegreya-sans'

injectGlobal`
  body {
    background: black;
  }
`
class DefaultLayout extends React.Component {
  render () {
    return (
      <div>
        {this.props.children()}
      </div>
    )
  }
}

export default DefaultLayout
