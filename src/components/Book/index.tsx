import React, { useState, useEffect, useRef } from "react"
import { renderToString } from "react-dom/server"
import { RouteComponentProps } from "react-router"
import Bindery from "bindery"
import Controls from "bindery-controls"
import { API } from "lib/api"
import { Block } from "../../types"

import PageHeader from "components/PageHeader"
import Page from "components/Page"
import SectionPage from "components/SectionPage"
import AboutPage from "components/AboutPage"
import TitlePage from "components/TitlePage"

interface BookProps {
  channel: {
    title: string
    metadata?: {
      description: string
    }
    user: {
      username: string
    }
    contents: Block[]
  }
}

const Book: React.FC<BookProps> = ({ channel }) => {
  const bookRef = useRef(null)

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
        rules: [
          Bindery.PageBreak({ selector: "h1", position: "before" }),
          Bindery.Footnote({
            selector: ".description",
            render: (element: any, number: number) => element,
            replace: (element: any) => element,
          }),
          header,
        ],
      })
    }
  }, [bookRef])

  return (
    <div ref={bookRef}>
      <TitlePage title={channel.title} author={channel.user.username} />

      {channel.metadata && channel.metadata.description !== "" && (
        <>
          <SectionPage title="About" />
          <AboutPage description={channel.metadata.description} />
        </>
      )}

      {channel.contents.reverse().map(b => (
        <Page block={b} key={b.id} />
      ))}
    </div>
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
    <div>
      {!channel && <h1>loading: {slug}</h1>}
      {channel && <Book channel={channel} />}
    </div>
  )
}

export default BookWrapper
