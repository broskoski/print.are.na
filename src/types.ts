export interface PageType {
  number: number
  isEmpty: boolean
  isLeft: boolean
  isRight: boolean
  heading: {
    h1?: any
    h2?: any
    h3?: any
    h4?: any
    h5?: any
    h6?: any
  }
}

export interface Block {
  id: number
  class: "Image" | "Text" | "Link" | "Channel" | "Embed"
  title: string
  content_html: string
  description_html: string
  image?: {
    thumb: {
      url: string
    }
    display: {
      url: string
    }
    large: {
      url: string
    }
    original: {
      url: string
    }
  }
}