import { apiBase } from "../config"

const BASE = apiBase[process.env.NODE_ENV]

// Transform v3 block to v2-compatible shape
const transformBlock = (block: any): any => {
  if (block.type === "Channel") {
    return { ...block, class: "Channel" }
  }

  return {
    id: block.id,
    class: block.type,
    title: block.title || "",
    content_html: block.content?.html || "",
    description_html: block.description?.html || "",
    position: block.connection?.position ?? 0,
    image: block.image
      ? {
          thumb: { url: block.image.small?.src || "" },
          display: { url: block.image.medium?.src || "" },
          large: { url: block.image.large?.src || "" },
          original: { url: block.image.src || "" },
        }
      : undefined,
    source: block.source
      ? {
          url: block.source.url,
          title: block.source.title || "",
        }
      : undefined,
    connected_by_username:
      block.connection?.connected_by?.slug ||
      block.connection?.connected_by?.name ||
      "",
    user: {
      username: block.user?.slug || block.user?.name || "",
    },
  }
}

// Transform v3 channel to v2-compatible shape
const transformChannel = (channel: any): any => {
  return {
    title: channel.title,
    slug: channel.slug,
    metadata: {
      description: channel.description?.markdown || "",
    },
    owner: {
      class: channel.owner?.type || "User",
      username: channel.owner?.slug || channel.owner?.name || "",
      name: channel.owner?.name || "",
      slug: channel.owner?.slug || "",
    },
    user: {
      slug: channel.owner?.slug || "",
      username: channel.owner?.slug || channel.owner?.name || "",
    },
    group:
      channel.owner?.type === "Group"
        ? { name: channel.owner?.name || "" }
        : undefined,
    collaborators: [],
  }
}

class API {
  get = (endpoint: string, options = {}) => {
    return fetch(endpoint, options)
      .then(response => response.json())
      .catch(err => false)
  }

  getBlockCount = (slug: string) => {
    return this.get(`${BASE}/channels/${slug}`).then(
      data => data.counts?.contents || 0
    )
  }

  getPaginatedChannelContents = (slug: string, pageIndex: number, per = 25) => {
    return this.get(
      `${BASE}/channels/${slug}/contents?page=${pageIndex}&per=${per}&sort=position_asc`
    ).then(data => ({
      contents: (data.data || []).map(transformBlock),
    }))
  }

  getChannelContents = (slug: string) => {
    return this.getFullChannel(slug)
  }

  getChannel = (slug: string) => {
    return this.get(`${BASE}/channels/${slug}?t=${Date.now()}`).then(data => {
      if (!data) throw new Error("Network error")
      if (data.error || data.code) {
        if (data.code === 401) throw new Error("Unauthorized")
        if (data.code === 404) throw new Error("Not Found")
        throw new Error(data.error || "Unknown error")
      }
      return transformChannel(data)
    })
  }

  getFullChannel = (
    slug: string,
    options?: {
      onEachPage?: (page: number) => void
      onGetTotal?: (totalPages: number) => void
      reverse?: boolean
    }
  ) => {
    const PER = 50
    const mergedContents: any[] = []
    const reverse = options?.reverse
    const sort = reverse ? "position_desc" : "position_asc"

    const getContentsPage = (channelSlug: string, page: number) => {
      options?.onEachPage?.(page)
      return this.get(
        `${BASE}/channels/${channelSlug}/contents?per=${PER}&page=${page}&sort=${sort}&t=${Date.now()}`
      )
    }

    return this.getChannel(slug).then(channel => {
      return getContentsPage(channel.slug, 1).then(firstPage => {
        if (!firstPage || firstPage.error) {
          throw new Error(firstPage?.error || "Failed to fetch contents")
        }

        const totalPages = firstPage.meta?.total_pages || 1

        options?.onGetTotal?.(totalPages)
        options?.onEachPage?.(1)

        mergedContents.push((firstPage.data || []).map(transformBlock))

        const remainingPages = Array.from(
          { length: totalPages - 1 },
          (_, i) => i + 2
        )

        return remainingPages
          .reduce(
            (promise, pageN) =>
              promise
                .then(() => getContentsPage(channel.slug, pageN))
                .then(page => {
                  mergedContents.push((page.data || []).map(transformBlock))
                }),
            Promise.resolve()
          )
          .then(() => ({
            ...channel,
            contents: mergedContents.flat(),
          }))
      })
    })
  }
}

export { API }
