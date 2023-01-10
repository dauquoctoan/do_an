import message from '../../commons/message'
import notification from '../../commons/notification'
import UploadMedia from '../../commons/upload'
import Configs from '../../configs'

const Home = () => {
  const handleSendMessage = () => {
    notification({
      description: 'Bài đăng',
      message: 'Thông báo mới',
      type: 'success',
    })
    message({ content: 'thanh cong', type: 'error' })
  }
  return (
    <div style={{ height: '150vh' }}>
      <UploadMedia
        name="image"
        size={10}
        title="Tải ảnh"
        action={Configs._media.path.IMAGE}
        accept={Configs._media.typeUpload.FILE()}
        changeListPath={(listPath: string[]) => {
          console.log('e', listPath)
        }}
      />
      <button onClick={handleSendMessage}>notification</button>
    </div>
  )
}

export default Home
