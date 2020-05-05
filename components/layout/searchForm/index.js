import {useContext} from 'react'

import fetch from 'isomorphic-unfetch'
import {Form, Input, Button} from 'antd'
import {MdSearch} from 'react-icons/md'

import {Context as SongContext} from '~/store/song'

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

export function SearchFormWrapper({setPageUrl}) {
  const {addSearchList} = useContext(SongContext)

  function getUnique(arr, comp) {
    return arr.map(i => i[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((i) => arr[i]).map(i => arr[i])
  }

  async function searchMusic(search) {
    setPageUrl()
    const headers = {'Content-Type': 'application/json'}
    const response = await fetch('/api/searchSpotify', {
      method: 'POST',
      body: JSON.stringify({search}),
      headers
    })
    const body = await response.json()
    const compareThis = body.tracks.items.map((item) => {return{artist: item.artists[0].name, album: item.album.name, imgPre: item.album.images[1].url, id: item.album.id}})
    addSearchList(getUnique(compareThis, 'id'))
  }

  return (
    <div className={styles['search_wrapper']}>
      <span onClick={() => setPageUrl()}>msuci_pl</span>
      <SearchForm searchMusic={search => searchMusic(search)} />
    </div>
  )
}

export default SearchFormWrapper