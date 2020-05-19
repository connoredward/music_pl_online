import styles from './styles.scss'

export default function AlbumCover (props) {
  const {albumCover, name, onClick} = props
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={albumCover} />
      <p>{name}</p>
    </div>
  )
}