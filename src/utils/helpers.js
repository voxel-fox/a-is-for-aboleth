import { css } from 'react-emotion'

export const rem = (px) => {
  return `${(px / 16)}rem`
}

export const visuallyHidden = css`
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  padding:0 !important;
  border:0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
`
