import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const Style = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  ::-moz-selection { background: #000; color: #fff; }
  ::selection { background: #000; color: #fff; }

  html {
    font-family: 'Arial';
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

const PageBreak = styled.h1`
  display: none;
`

export { Style, PageBreak }
