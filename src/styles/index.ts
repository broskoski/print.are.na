import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const Style = createGlobalStyle`
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
