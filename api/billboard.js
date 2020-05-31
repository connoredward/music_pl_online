import fetch from 'isomorphic-unfetch'

export async function getWeekCharts(token) {
  return await new Promise(async(res, rej) => {
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch('/api/currentCharts', {
      method: 'POST', 
      body: JSON.stringify({token}),
      headers
    })
    res(await response.json())
  })
}

export default {
  getWeekCharts
}
