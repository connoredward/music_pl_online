const styles = {
  maxWidth: '800px',
  width: '80vw',
  minWidth: '320px',
  margin: '0 auto',
  padding: '150px 0'
}

export function PageWrapper({children, className}) {
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  )
}

export default PageWrapper