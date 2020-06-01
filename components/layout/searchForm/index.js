import {useContext} from 'react'

import {Form, Input, Button} from 'antd'
import {MdSearch} from 'react-icons/md'

import searchSpotify from '~/components/modules/spotifySearch'
import {Context as SongContext} from '~/store/song'

import {searchSpotifyArtist, getToken} from '~/api/spotify'

import styles from './styles.scss'

function SearchFormRaw ({ form, searchMusic }) {
  const { getFieldDecorator } = form
  function handleSubmit() {
    return e => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) searchMusic(values.Search)
      })
    }
  }
  return (
    <Form onSubmit={handleSubmit()} className={styles['search_form']}>
      <Form.Item>
        {getFieldDecorator('Search', {
          rules: [{ required: false, message: 'Please input something' }],
        })(<Input placeholder='Search...' />)}
      </Form.Item>
      <Button type="primary" htmlType="submit"><MdSearch /></Button>
    </Form>
  )
}

const SearchForm = Form.create({ name: 'search-spotify' })(SearchFormRaw)

export function SearchFormWrapper({setPageUrl, emptyRoute}) {
  const {addSearchList, accessToken, changeAccessToken} = useContext(SongContext)

  async function searchMusic(search) {
    setPageUrl({search})
    if (new Date() - accessToken?.createdAt >= 3600000) changeAccessToken(await getToken())
    console.log('search form', accessToken)
    addSearchList(await searchSpotifyArtist(accessToken, search))
  }

  return (
    <div className={styles['search_wrapper']}>
      <span onClick={() => emptyRoute()}>msuci_pl</span>
      <SearchForm searchMusic={search => searchMusic(search)} />
    </div>
  )
}

export default SearchFormWrapper