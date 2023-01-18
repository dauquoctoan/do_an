import { useEffect, useRef, useState } from 'react'
import { Form, FormInstance, Select } from 'antd'
import { ApiClient } from '../../services'
import { iAutoComplete, IOptions } from './interface'

const AutoComplete = ({
  path,
  onSelected,
  method,
  placeholder,
  option_key,
  option_value,
  form,
  name,
  mode,
  rules,
  wrapperCol,
  labelCol,
  label,
  defaultOptions,
}: iAutoComplete) => {
  const [search, setSearch] = useState<string>('')
  const [options, setOptions] = useState<IOptions[]>([])
  const formInstances = useRef<FormInstance>()

  useEffect(() => {
    if (defaultOptions && options.length === 0) {
      const dataOptions: IOptions[] = convertData()
      setOptions(dataOptions)
    }
  }, [])

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getData()
    }, 500)
    return () => {
      clearTimeout(timeOut)
    }
  }, [search])

  const onSearch = (searchText: string) => {
    setSearch(searchText)
  }

  const getData = async () => {
    try {
      if (search !== '') {
        const res: any = await ApiClient[method](path, { searchKey: search })
        if (res) {
          const data = res?.data?.data?.map((item: any) => {
            return { key: item[option_key], value: item[option_value] }
          })
          setOptions(data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const convertData = () => {
    if (mode === 'multiple') {
      const data: IOptions[] = defaultOptions.map((item: any) => {
        const options: IOptions = {
          key: item[option_key],
          value: item[option_value],
        }
        return options
      })
      return data
    } else {
      const data: IOptions = {
        key: defaultOptions[option_key],
        value: defaultOptions[option_value],
      }
      return [data]
    }
  }

  const onSelect = (data: number | number[]) => {
    // formInstances.current?.setFieldValue(name, data)
    onSelected && onSelected(data)
  }

  return (
    <>
      <Form.Item
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        name={name}
        rules={rules}
        label={label}
      >
        <Select
          defaultValue={undefined}
          mode={mode === 'multiple' ? mode : undefined}
          showSearch
          style={{ width: '100%' }}
          onChange={onSelect}
          onSearch={onSearch}
          placeholder={placeholder}
          optionFilterProp="children"
        >
          {options.map((item: IOptions, i) => {
            return (
              <Select.Option key={i} value={item.key}>
                {item.value}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </>
  )
}

export default AutoComplete
