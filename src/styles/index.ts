import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const Style = createGlobalStyle`
  html {
    font-family: 'Arial';
    font-size: 14pt;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .📖-right .📖-running-header {
    text-align: left;
    width: var(--bindery-page-width);
    right: 0;
  }

  .📖-footer p {
    margin-bottom: 8pt;
  }
`

const PageBreak = styled.h1`
  display: none;
`

export { Style, PageBreak }
