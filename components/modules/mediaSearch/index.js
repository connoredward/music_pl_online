import search from 'youtube-search'

const opts = {
  maxResults: 1,
  key: 'AIzaSyAIAc4071I3-lI2SdyxsMmPdZj6YylMfyM'
  // key: 'AIzaSyBRH3pEYm8Q5S5g-C0wtitgbIfDNBDUb-s'
  // key: 'AIzaSyBbLNfz6PK12FM3y7qUN2hdBEqqgbXSABQ'
}

export function MediaSearch ({artist, song}) {
  return new Promise ((res, rej) => {
    search(`${artist} - ${song}`, opts, (err, results) => {
      console.log('searching youtube...')
      if(err) rej(err)
      res(results)
    })
  })
}

export default MediaSearch