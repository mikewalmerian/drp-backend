import fetch from 'node-fetch'

export function getRingpoolData(req, res) {
  const { body: ringpoolData } = req

  const url = `http://t.womtp.com/adcd/v1/?campaignid=${ringpoolData.campaignid}&prefid=${ringpoolData.visitorId}`

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      global.ringpoolData = { ...ringpoolData, ...data }
      res.json(data)
    })
}
