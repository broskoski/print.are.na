import { apiBase } from "../config"
import flattenDeep from "lodash/flattenDeep"

const BASE = apiBase[process.env.NODE_ENV]

class API {
  get = (endpoint: string, options = {}) => {
    return fetch(endpoint, options)
      .then(response => response.json())
      .catch(err => false)
  }

  getBlockCount = (slug: string) => {
    return this.get(`${BASE}/channels/${slug}/thumb`).then(data => data.length)
  }

  getPaginatedChannelContents = (slug: string, pageIndex: number, per = 25) => {
    return this.get(`${BASE}/channels/${slug}?page=${pageIndex}&per=${per}`)
  }

  getChannelContents = (slug: string) => {
    return this.getFullChannel(slug)
  }

  getInitialChannel = (
    slug: string,
    options: {
      isShare?: boolean
      reverse?: boolean
    }
  ) => {
    const fetchOptions = options.isShare
      ? { headers: { "X-SHARE-TOKEN": slug } }
      : {}
    const order = options && options.reverse ? "desc" : "asc"
    const baseUrl = options.isShare
      ? `${BASE}/channels/by_share_link/${slug}`
      : `${BASE}/channels/${slug}`

    return this.get(
      `${baseUrl}?per=1&page=1&sort=position&direction=${order}&t=${Date.now()}`,
      fetchOptions
    )
  }

  getFullChannel = (
    slug: string,
    options?: {
      onEachPage?: (page: number) => void
      onGetTotal?: (totalPages: number) => void
      isShare?: boolean
      reverse?: boolean
    }
  ) => {
    const PER = 50
    const mergedContents: any = []
    const isShare = options && options.isShare
    const reverse = options && options.reverse

    const fetchOptions = isShare ? { headers: { "X-SHARE-TOKEN": slug } } : {}
    const order = reverse ? "desc" : "asc"

    const getChannelPage = (slug: string, page: number) => {
      options && options.onEachPage && options.onEachPage(page)
      const baseUrl = `${BASE}/channels/${slug}`

      return this.get(
        `${baseUrl}?per=${PER}&page=${page}&sort=position&direction=${order}&t=${Date.now()}`,
        fetchOptions
      )
    }

    return this.getInitialChannel(slug, { isShare, reverse }).then(channel => {
      if (channel.code) {
        throw new Error(channel.message)
      }

      mergedContents.push(channel.contents)

      const totalPages = Math.ceil((channel.length - 1) / PER)

      options && options.onGetTotal && options.onGetTotal(totalPages)
      options && options.onEachPage && options.onEachPage(1)

      return Array(totalPages)
        .fill(undefined)
        .map((_, pageN) => pageN + 1)
        .reduce(
          (promise, pageN) =>
            promise
              .then(() => getChannelPage(channel.slug, pageN))
              .then(({ contents }) => {
                mergedContents.push(contents)
              }),
          Promise.resolve()
        )
        .then(_ => {
          const entireChannel = Object.assign({}, channel, {
            contents: flattenDeep(mergedContents),
          })
          return entireChannel
        })
    })
  }
}

export { API }
