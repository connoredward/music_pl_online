import search from 'youtube-search'

const keys = [
  'AIzaSyAIAc4071I3-lI2SdyxsMmPdZj6YylMfyM',
  'AIzaSyBRH3pEYm8Q5S5g-C0wtitgbIfDNBDUb-s',
  'AIzaSyBbLNfz6PK12FM3y7qUN2hdBEqqgbXSABQ'
]

const opts = (num) => {
  return {
    maxResults: 1,
    key: keys[num]
  }
}

export function MediaSearch (props) {
  const {artist, song, keyNum = 0} = props
  return new Promise ((res, rej) => {
    search(`${artist} - ${song}`, opts(keyNum), (err, results) => {
      console.log('searching youtube...')
      if(err) {
        if (keyNum < keys.length - 1 ) {
          res({...props, keyNum: keyNum + 1})
        }
        rej(err)
      }
      res(results)
    })
  })
}

export default MediaSearch