import fetch from 'node-fetch'

export function sendCalledResponse(req, res) {
  console.log('Cliente Conectado 💻')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)

  const pollingToCall = setInterval(() => {
    const [uid, campaignid, visitorId] = global.ringpoolParams
    const url = `https://t.womtp.com/vidck/v1/?uid=${uid}&campaignid=${campaignid}&prefid=${visitorId}`

    fetch(url)
      .then((res) => res.json())
      .then(handleResponse)

    function handleResponse(data) {
      const formatedResult = JSON.stringify(data)
      const ringpoolCalled = data.called
      const responseToSendFront = `data: ${formatedResult}\n\n`
      res.write(responseToSendFront)
      if (ringpoolCalled === 'true') {
        clearInterval(pollingToCall)
      }
      console.log(ringpoolCalled)
    }
  }, 1000)

  res.on('close', () => {
    console.log('client close connection')
    clearInterval(pollingToCall)
    res.end()
  })
}
