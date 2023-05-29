export function getRingpoolData(req) {
  const { url } = req
  const paramsSplited = url.split('&')

  const params = paramsSplited.map((param) => {
    const [values] = param.split('=').reverse()
    return values
  })

  global.ringpoolParams = params
}
