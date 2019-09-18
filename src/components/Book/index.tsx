import React, { useState, useEffect, useRef } from "react"
import { RouteComponentProps } from "react-router"
import Bindery from "bindery"
import Controls from "bindery-controls"
import { API } from "lib/api"

interface BookProps {
  channel: {
    contents: [
      {
        id: number
        title: string
        image?: {
          thumb: {
            url: string
          }
          display: {
            url: string
          }
        }
      }
    ]
  }
}

const Book: React.FC<BookProps> = ({ channel }) => {
  const bookRef = useRef(null)

  useEffect(() => {
    if (bookRef.current) {
      Bindery.makeBook({
        content: bookRef.current,
        ControlsComponent: Controls,
        view: Bindery.View.FLIPBOOK,
        rules: [Bindery.PageBreak({ selector: "h1", position: "before" })],
      })
    }
  }, [bookRef])

  return (
    <div ref={bookRef}>
      {channel.contents.map(b => {
        return (
          <h1>
            {b.title}
            {b.image &&
              b.image.thumb &&
              b.image.thumb.url &&
              b.image.thumb.url.toLowerCase().indexOf("gif") < 0 && (
                <img src={b.image.thumb.url} alt={b.title} />
              )}
          </h1>
        )
      })}
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
