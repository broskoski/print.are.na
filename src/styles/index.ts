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

  .📖-running-header {
    border-bottom: 1px solid blue;
    min-height: 0.35in;
  }

  .📖-right .📖-running-header {
    text-align: left;
    width: var(--bindery-page-width);
    right: 0;
  }

  .📖-flow-box {
    margin-bottom: var(--bindery-margin-outer);
  }

  .📖-footer {
    display: none;
  }

  .📖-footer p {
    margin-bottom: 8pt;
  }
`

const PageBreak = styled.h1`
  display: none;
`

export { Style, PageBreak }
