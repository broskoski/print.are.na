import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { renderToString } from "react-dom/server"
import { RouteComponentProps } from "react-router"
import Bindery from "bindery"
import Controls from "bindery-controls"
import { API } from "lib/api"
import { Block } from "../../types"

import LoadingPage from "components/LoadingPage"

import PageHeader from "components/PageHeader"
import Page from "components/Page"
import SectionPage from "components/SectionPage"
import AboutPage from "components/AboutPage"
import TableOfContents from "components/TableOfContents"
import TitlePage from "components/TitlePage"

const BookContainer = styled.div`
  opacity: 0;
`

interface BookProps {
  channel: {
    title: string
    metadata?: {
      description: string
    }
    owner: {
      class: "User" | "Group"
      username?: string
      name?: string
    }
    contents: Block[]
  }
}

const Book: React.FC<BookProps> = ({ channel }) => {
  const bookRef = useRef(null)

  console.log("channel", channel)

  useEffect(() => {
    if (bookRef.current) {
      const header = Bindery.RunningHeader({
        render: (page: any) => {
          return renderToString(<PageHeader page={page} />)
        },
      })

      Bindery.makeBook({
        content: bookRef.current,
        ControlsComponent: Controls,
        pageSetup: {
          margin: {
            top: "0.35in",
            inner: "0.65in",
            outer: "0.35in",
            bottom: "0.35in",
          },
        },
        rules: [
          // TOC
          Bindery.PageReference({
            selector: ".toc-page a",
            replace: (element: HTMLAnchorElement, pageNumber: number) => {
              let number = document.createElement("div")
              number.innerHTML = `<div>${pageNumber}</div>`
              element.appendChild(number)
              return element
            },
          }),
          Bindery.PageBreak({
            selector: ".toc-page hr",
            position: "before",
            continue: "left",
          }),
          // Start of book contents
          Bindery.PageBreak({
            selector: ".contents-start",
            position: "before",
            continue: "left",
          }),
          // Normal page
          header,
          Bindery.PageBreak({
            selector: "hr",
            position: "after",
          }),
        ],
      })
    }
  }, [bookRef])

  const contents = channel.contents
    .filter(b => b.class !== "Channel")
    .map(b => {
      const isFileName =
        b.title &&
        (b.title.toLowerCase().indexOf(".jpg") > 0 ||
          b.title.toLowerCase().indexOf(".jpeg") > 0 ||
          b.title.toLowerCase().indexOf(".png") > 0 ||
          b.title.toLowerCase().indexOf(".gif") > 0 ||
          b.title.toLowerCase().indexOf(".pdf") > 0)

      const title = isFileName ? "" : unescape(b.title)

      return {
        ...b,
        title,
      }
    })

  const hasTOC = contents.filter(b => !!b.title).length > 0
  const hasAboutPage = channel.metadata && channel.metadata.description !== ""
  const author =
    (channel.owner.class === "User"
      ? channel.owner.username
      : channel.owner.name) || ""

  return (
    <BookContainer className="book-container" ref={bookRef}>
      <TitlePage title={channel.title} author={author} />

      {hasAboutPage && (
        <>
          <SectionPage title="About" />
          <AboutPage
            description={channel.metadata && channel.metadata.description}
          />
        </>
      )}

      {hasTOC && (
        <>
          <SectionPage title="Table of Contents" />
          <TableOfContents blocks={contents} />
        </>
      )}

      <div className="contents-start" />

      {contents.reverse().map(b => (
        <Page block={b} key={b.id} />
      ))}
    </BookContainer>
  )
}

type BookWrapperProps = RouteComponentProps<{ slug: string }>

const BookWrapper: React.FC<BookWrapperProps> = ({
  match: {
    params: { slug },
  },
}) => {
  const [channel, setChannel] = useState<any | null>(null)

  const api = new API()

  useEffect(() => {
    if (!channel) {
      api.getFullChannel(slug).then(channel => setChannel(channel))
    }
  }, [channel, slug, api])

  return (
    <>
      {!channel && <LoadingPage slug={slug} />}
      {channel && <Book channel={channel} />}
    </>
  )
}

export default BookWrapper
