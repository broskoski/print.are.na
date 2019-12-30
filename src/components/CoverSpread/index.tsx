import React, { MutableRefObject, useEffect } from "react"
import styled from "styled-components"

import { Channel } from "../../types"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: blue;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Interior = styled.div<{ pages: number }>`
  height: var(--bindery-page-height);
  width: calc(
    (var(--bindery-page-width) * 2) + ${props => props.pages * 0.002290909}
  );
  background: white;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.1in;
  overflow: hidden;
`

const Spine = styled.div<{ pages: number }>`
  height: 100%;
  width: ${props => props.pages * 0.002290909}in;
  // border-left: 1px solid gray;
  // border-right: 1px solid gray;
  padding-top: 0.2in;

  position: relative;
  box-sizing: border-box;
`

const SpineTitle = styled.div<{ pages: number }>`
  transform: rotate(90deg);
  transform-origin: left;

  width: var(--bindery-sheet-width);
  height: ${props => props.pages * 0.002290909}in;
  position: absolute;
  left: 0;

  margin-left: ${props => (props.pages * 0.002290909) / 2}in;
  line-height: ${props => props.pages * 0.002290909}in;
`

const LogoHolder = styled.div`
  position: absolute;
  bottom: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img.attrs({ src: "/logo.png" })`
  width: 80%;
  height: auto;
`

const Title = styled.h6`
  margin: 0;
  font-size: 13pt;
  font-weight: normal;
`

const Author = styled.div`
  margin: 0;
  font-size: 13pt;
`

const Page = styled.div`
  width: var(--bindery-page-width);
  height: 6.275in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25in;
`

const Buttons = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  @media print {
    display: none;
  }
`

const PrintButton = styled.button``

const CloseButton = styled.button``

interface CoverSpreadProps {
  bookRef: MutableRefObject<null | HTMLDivElement>
  channel: Channel
  onClose: () => void
}

const CoverSpread: React.FC<CoverSpreadProps> = ({ channel, onClose }) => {
  const singlePageCount = document.body.getElementsByClassName("📖-print-sheet")
    .length
  const gridSpreadCount = document.body.getElementsByClassName(
    "📖-spread-wrapper"
  ).length
  const flipBookSpreadCount = document.body.getElementsByClassName("📖-page3d")
    .length

  const spreadCount = Math.max(gridSpreadCount, flipBookSpreadCount)

  const pageCount = spreadCount > 0 ? spreadCount * 2 : singlePageCount

  const author =
    (channel.owner.class === "User"
      ? channel.owner.username
      : channel.owner.name) || ""

  useEffect(() => {
    // Create and append style
    const head = document.head || document.getElementsByTagName("head")[0]
    const style = document.createElement("style")
    const css = `@page {
      size: 8.876in 7.125in;
    }`

    style.id = "coverStyle"
    style.type = "text/css"
    style.appendChild(document.createTextNode(css))
    head.appendChild(style)

    // Now make sure to hide the bookEl
    const bookEl = document.body.getElementsByClassName("📖-root")[0]
    if (bookEl && bookEl instanceof HTMLElement) {
      bookEl.style.display = "none"
    }

    return () => {
      head.removeChild(style)
      if (bookEl && bookEl instanceof HTMLElement) {
        bookEl.style.display = "block"
      }
    }
  })

  return (
    <Container>
      <Interior pages={pageCount}>
        <Page />
        <Spine pages={pageCount}>
          <SpineTitle pages={pageCount}>{channel.title}</SpineTitle>
          <LogoHolder>
            <Logo />
          </LogoHolder>
        </Spine>
        <Page>
          <Title>{channel.title}</Title>
          <Author>{author}</Author>
        </Page>
      </Interior>
      <Buttons className="no-print">
        <PrintButton
          className="📖-control 📖-btn 📖-btn-main"
          onClick={() => {
            window.print()
          }}
        >
          Print Cover
        </PrintButton>
        <CloseButton
          className="📖-control 📖-btn 📖-btn-main"
          onClick={onClose}
        >
          Close
        </CloseButton>
      </Buttons>
    </Container>
  )
}

export default CoverSpread
