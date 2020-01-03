import React, { MutableRefObject, useEffect } from "react"
import styled from "styled-components"

import { Channel } from "../../types"

const PAGE_DEPTH = 0.001835
const PAGE_WIDTH = 4.375
const SPREAD_WIDTH = PAGE_WIDTH * 2

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
  width: ${props => props.pages * PAGE_DEPTH + SPREAD_WIDTH}in;
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
  width: ${props => props.pages * PAGE_DEPTH}in;
  padding-top: 0.2in;

  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  // border-left: 1px solid gray;
  // border-right: 1px solid gray;
`

const SpineTitleHolder = styled.div<{ pages: number }>`
  transform-origin: 0 0;
  transform: rotate(90deg) translateY(-${props => props.pages * PAGE_DEPTH}in)
    translateX(0.35in);

  width: var(--bindery-sheet-width);
  height: ${props => props.pages * PAGE_DEPTH}in;
  position: absolute;
  left: -1px;
  right: 0;
  top: 0;

  line-height: ${props => props.pages * PAGE_DEPTH}in;

  display: flex;
  align-items: center;

  ${props =>
    props.pages &&
    props.pages < 90 &&
    `
    font-size: 10px;
  `}

  ${props =>
    props.pages &&
    props.pages < 30 &&
    `
    display: none;
  `}
`

const LogoHolder = styled.div<{ pages: number }>`
  position: absolute;
  bottom: 0.325in;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img.attrs({ src: "/logo.png" })<{ pages: number }>`
  width: 25px;
  height: auto;

  ${props =>
    props.pages &&
    props.pages < 90 &&
    `
    display: none;
  `}
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

const URL = styled.div`
  margin: 0;
  font-size: 8pt;
  line-height: 13pt;
`

const Page = styled.div`
  width: ${PAGE_WIDTH}in;
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
      size: ${SPREAD_WIDTH + pageCount * PAGE_DEPTH}in 7.125in;
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
        <Page>
          <div>{` `}</div>
          <URL>{`https://www.are.na/${channel.owner.slug}/${channel.slug}`}</URL>
        </Page>
        <Spine pages={pageCount}>
          <SpineTitleHolder pages={pageCount}>{channel.title}</SpineTitleHolder>
          <LogoHolder pages={pageCount}>
            <Logo pages={pageCount} />
          </LogoHolder>
        </Spine>
        <Page>
          <Title>{channel.title}</Title>
          <div>
            <Author>{author}</Author>
            {channel.collaborators &&
              channel.collaborators.map(c => {
                return <Author>{c.username}</Author>
              })}
          </div>
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
