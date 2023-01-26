import { Select } from 'antd'
import { getDataTypeStalls } from 'features/Stalls/api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import styled from 'styled-components'
import { getPartLessons } from '../api'

const PartLesson = () => {
    const [options, setOptions] = useState<any[]>([])
    const { topic } = useSelector((state: RootState) => {
        return state.lessonReducer
    })

    async function getData() {
        const res = await getPartLessons({ topic: topic?._id })
        let tmpOptions: any[] = []
        res.data.forEach((item: any) => {
            tmpOptions.push({ value: item._id, label: item.title })
        })
        setOptions(tmpOptions)
    }
    useEffect(() => {
        getData()
    }, [topic?._id])

    return (
        <SPartLesson>
            <Select
                showSearch
                style={{ width: 200, flex: 2 }}
                placeholder="Chọn học phần"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                options={options}
            />
        </SPartLesson>
    )
}

export default PartLesson

const SPartLesson = styled.div`
    width: 100%;
    height: auto;
`