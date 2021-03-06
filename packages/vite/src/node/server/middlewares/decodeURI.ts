import { Connect } from 'types/connect'

export function decodeURIMiddleware(): Connect.NextHandleFunction {
  return (req, _, next) => {
    // #2195
    req.url = decodeURI(req.url!)

    // `sirv` middleware uses the req._parsedUrl values to find the file,
    // so decode it all together.
    // @ts-ignore
    const parsedUrl = req._parsedUrl
    for (const key of Object.keys(parsedUrl)) {
      const val = parsedUrl[key]
      if (val) parsedUrl[key] = decodeURI(val)
    }
    next()
  }
}
