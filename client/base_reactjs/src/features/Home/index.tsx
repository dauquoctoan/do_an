import message from '../../commons/message'
import notification from '../../commons/notification'

const Home = () => {
  const handleSendMessage = () => {
    notification.success('ss','desc')
    message({ content: 'thanh cong', type: 'error' })
  }
  return (
    <div style={{ height: '150vh' }}>
    </div>
  )
}

export default Home
