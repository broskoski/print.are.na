import { parse } from "qs"

export default (values: string) => {
  return parse(values, {
    ignoreQueryPrefix: true,
    decoder(str: string, decoder, charset) {
      const strWithoutPlus = str.replace(/\+/g, " ")
      if (charset === "iso-8859-1") {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape)
      }

      if (/^(\d+|\d*\.\d+)$/.test(str)) {
        return parseFloat(str)
      }

      // utf-8
      try {
        return JSON.parse(decodeURIComponent(strWithoutPlus))
      } catch (e) {
        return strWithoutPlus
      }
    },
  })
}
