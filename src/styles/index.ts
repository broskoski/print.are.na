import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const Style = createGlobalStyle`
  html {
    font-family: 'Arial';
    font-size: 13pt;
  }

  body {
    margin: 0;
    padding: 0;
  }

  ol {
    margin-top: 0;
    margin-bottom: 0;
    list-style-type: upper-roman;
    padding-left: 0.35in;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
  }

  .📖-root .book-container {
    opacity: 1;
  }

  .📖-running-header {
    top: 0.35in;
    min-height: 0.35in;
  }

  .📖-right .📖-running-header {
    text-align: right;
    width: var(--bindery-page-width);
  }

  .📖-page.📖-left .page-header {
    padding-left: 0.35in;
  }

  .page.📖-continuation.📖-continues {
    margin-top: 0.335in;
  }

  .toc-page.page.📖-continuation.📖-continues {
    margin-top: 0;
  }

  .📖-flow-box {
    margin-bottom: var(--bindery-margin-outer);
    overflow: hidden;
  }

  .📖-footer {
    display: none;
  }

  .📖-footer p {
    margin-bottom: 8pt;
  }
`

const PageBreak = styled.hr`
  display: none;
`

export { Style, PageBreak }
