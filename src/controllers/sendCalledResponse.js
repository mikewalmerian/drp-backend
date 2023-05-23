import fetch from 'node-fetch'

export function sendCalledResponse(req, res) {
  console.log('Client Connected 💻')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalid = setInterval(() => {
    fetch(
      `https://t.womtp.com/vidck/v1/?uid=${global.ringpoolData.uid}&campaignid=${global.ringpoolData.campaignid}&prefid=${global.ringpoolData.prefid}`
    )
      .then((res) => res.json())
      .then(handleResponse)

    function handleResponse(data) {
      const finalResult = JSON.stringify(data)
      const ringpoolCalled = data.called
      res.write(`data: ${finalResult}\n\n`)
      if (ringpoolCalled === 'true') {
        clearInterval(intervalid)
      }

      console.log(ringpoolCalled)
    }
  }, 1000)

  res.on('close', () => {
    console.log('client close connection')
    clearInterval(intervalid)
    res.end()
  })
}
