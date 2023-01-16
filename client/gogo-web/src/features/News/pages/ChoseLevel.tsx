import { InputNumber, Button, AutoComplete } from 'antd'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {prev} from '../../../store/lesson/lessonSlice'
import Descriptions from 'antd/lib/descriptions'
import Configs from 'configs'

const ChoseLevel = () => {
  const dispatch = useDispatch()
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];

  const onSelect = (data: any) => {
    
    // dispatch(setTopic(topicSelected))
  }
  const setSearch = (data: any) => {
    
    // dispatch(setTopic(topicSelected))
  }
  return (
    <SChoseLevel>
        <AutoComplete
        options={options}
        style={{ width: 200, flex: 1 }}
        onSelect={onSelect}
        onChange={setSearch}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="level"
      />
        <div className='content'> 
        <Descriptions title="LV">
            <Descriptions.Item label="LV">{Configs.renderText('a')}</Descriptions.Item>
        </Descriptions>
        </div>
        <Button type="primary" 
          onClick={()=>{
            dispatch(prev())
          }}>
          Quay lại
        </Button>
    </SChoseLevel>
  )
}

export default ChoseLevel

const SChoseLevel = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    .content{
      flex: 5;
      margin-left: 10px;
    }
`