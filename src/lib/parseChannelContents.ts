import { Block } from "../types"

const getImageDimensions = (src?: string) => {
  return new Promise<{ height: number | null; width: number | null }>(
    (resolve, reject) => {
      try {
        if (!src) {
          return resolve({ height: null, width: null })
        }
        let img = new Image()
        img.onload = () => resolve({ height: img.height, width: img.width })
        img.onerror = () => resolve({ height: null, width: null })
        img.src = src
      } catch {
        return resolve({ height: null, width: null })
      }
    }
  )
}

const cleanBlockData = async (b: Block) => {
  const isFileName =
    b.title &&
    (b.title.toLowerCase().indexOf(".jpg") > 0 ||
      b.title.toLowerCase().indexOf(".jpeg") > 0 ||
      b.title.toLowerCase().indexOf(".png") > 0 ||
      b.title.toLowerCase().indexOf(".gif") > 0 ||
      b.title.toLowerCase().indexOf(".pdf") > 0)

  const title = isFileName ? "" : unescape(b.title)
  const imageUrl = b.image && b.image.large && b.image.large.url

  const { width, height } = await getImageDimensions(imageUrl)

  return {
    ...b,
    hasImage: !!imageUrl,
    imageUrl,
    dimensions: {
      width,
      height,
    },
    title,
  } as Block
}

const parseChannelContents = async (contents: Block[]) => {
  const filteredContents = contents.filter(b => b && b.class !== "Channel")
  const parsedContents = Promise.all(filteredContents.map(cleanBlockData))

  return parsedContents
}

export { getImageDimensions, parseChannelContents }
