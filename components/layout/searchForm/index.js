import {useContext} from 'react'

import fetch from 'isomorphic-unfetch'
import {Form, Input, Button} from 'antd'
import {MdSearch} from 'react-icons/md'

import searchSpotify from '~/components/modules/spotifySearch'
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

  async function searchMusic(search) {
    setPageUrl()
    addSearchList(await searchSpotify(search))
  }

  return (
    <div className={styles['search_wrapper']}>
      <span onClick={() => setPageUrl()}>msuci_pl</span>
      <SearchForm searchMusic={search => searchMusic(search)} />
    </div>
  )
}

export default SearchFormWrapper