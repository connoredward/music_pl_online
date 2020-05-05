import {useContext} from 'react'

import fetch from 'isomorphic-unfetch'
import {Form, Input, Button} from 'antd'
import {MdSearch} from 'react-icons/md'

import {Context as SongContext} from '~/store/song'

import styles from './styles.scss'

function SearchFormRaw({searchMusic}) {
  const onFinish = values => {
    if(values && values.search) searchMusic(values.Search)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='spotify-search'
      className={styles['search_form']}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='search'
        rules={[{ required: false}]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          <MdSearch />
        </Button>
      </Form.Item>
    </Form>
  )
}


export function SearchFormWrapper({setPage}) {
  const {addSearchList} = useContext(SongContext)

  function getUnique(arr, comp) {
    return arr.map(i => i[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((i) => arr[i]).map(i => arr[i])
  }

  async function searchMusic(search) {
    // setPage('')
    
  }

  return (
    <div className={styles['search_wrapper']}>
      <span onClick={() => setPage('')}>msuci_pl</span>
      <SearchFormRaw searchMusic={search => searchMusic(search)} />
    </div>
  )
}

export default SearchFormWrapper