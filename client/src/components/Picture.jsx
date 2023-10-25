import StagePicture from '../common/StagePicture.png'

const width = 800
const styles = {
  container: {
    height: width * 13 / 16,
    width,
  }
}

export default function Picture() {
  return (
    <div style={styles.container}>
      <img src={StagePicture} style={styles.container} />
    </div>
  )
}
