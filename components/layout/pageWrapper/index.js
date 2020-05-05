import SearchForm from '~/components/layout/searchForm'

import styles from './styles.scss'

export function PageWrapper({children, setPageUrl}) {
  return (
    <div className={styles.main}>
      <SearchForm setPageUrl={url => setPageUrl(url)} />
      {children}
    </div>
  )
}

export default PageWrapper