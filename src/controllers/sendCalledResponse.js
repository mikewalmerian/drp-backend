import fetch from 'node-fetch'

export function sendCalledResponse(req, res) {
  const url = req.url
  const paramsSplited = url.split('&')

  const params = paramsSplited.map((param) => {
    const [values] = param.split('=').reverse()
    return values
  })

  console.log('Client Connected 💻')
  // res.setHeader('Content-Type', 'text/event-stream')
  // res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalid = setTimeout(() => {
    const [uid, campaignid, visitorId] = params
    const url = `https://t.womtp.com/vidck/v1/?uid=${uid}&campaignid=${campaignid}&prefid=${visitorId}`

    fetch(url)
      .then((res) => res.json())
      .then(handleResponse)
    function handleResponse(data) {
      const finalResult = JSON.stringify(data)
      const ringpoolCalled = data.called
      res.write(`data: ${finalResult}\n\n`)
      if (ringpoolCalled === 'true') {
        clearInterval(intervalid)
      }
      console.log(data)
    }
  }, 1000)

  res.on('close', () => {
    console.log('client close connection')
    clearInterval(intervalid)
    res.end()
  })
}
