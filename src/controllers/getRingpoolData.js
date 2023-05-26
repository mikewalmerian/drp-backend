import fetch from 'node-fetch'

export function getRingpoolData(req, res) {
  const url = `http://t.womtp.com/adcd/v1${req.url}`
  const [urlWhitoutCallback] = url.split('&callback', 1)

  console.log(url)
  fetch(urlWhitoutCallback)
    .then((response) => response.json())
    .then((result) => res.send(result))
}
