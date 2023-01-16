import { AutoComplete, Descriptions,Button } from 'antd'
import Configs from 'configs'
import { useDispatch, useSelector } from 'react-redux'
import { prev, setTypeTopic } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'

const ChoseTypeLesson = () => {
    const dispatch = useDispatch()
    const lesson = useSelector((state: RootState)=>{
        return state.lessonReducer;
    })
    const options = [
        {_id:1, value: 'Card'},
        {_id:2, value: 'Card'},
        {_id:3, value: 'Card'},
    ]
    function onSelect(value: any){
        const option = options.find((item:any)=>{
            if(item.value ===value){
                return item
            }
        })
        dispatch(setTypeTopic(option))
    }
  return (
    <IChoseTypeLesson>
        <AutoComplete
                options={options}
                style={{ width: 200, flex: 1 }}
                onSelect={onSelect}
                filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                placeholder="level"
            />
        <div className='content'> 
        <Descriptions title="info">
            <Descriptions.Item label="Type">{Configs.renderText(lesson.type?.value)}</Descriptions.Item>
        </Descriptions>
        </div>
        <Button type="primary" 
        onClick={()=>{
            dispatch(prev())
        }}>
        Quay lại
        </Button>
    </IChoseTypeLesson>
  )
}

export default ChoseTypeLesson


const IChoseTypeLesson = styled.div`
    width: 100%;
    height: auto;
`