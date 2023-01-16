import { useState, useEffect, memo } from 'react'
import { Input } from 'antd'
import Icon from '@ant-design/icons'
import styled from 'styled-components'
import { useDebounce } from 'commons/hooks/Debounce'
import { InputNumberStyled } from 'features/Webview/components/Style/Styled'
const { Search } = Input

const Container = styled.div`
  /* width: 100%; */
  padding-left: 10px;
  background-color: white;
`
type IProps = {
  onSearchSubmit: (key: string) => void
  isSearchLoading?: boolean
  placeholder?: string
  width?: number
  type?: string
  style?: any
}

const AutoSearchInput = ({
  onSearchSubmit,
  placeholder,
  width,
  type,
  style,
}: IProps) => {
  const [searchKey, setSearchKey] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchKey, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearchSubmit(searchKey)
    } else {
      onSearchSubmit('')
    }
  }, [debouncedSearchTerm])

  const handleInputOnchange = (e: any) => {
    const { value } = e.target
    setSearchKey(value)
  }

  return (
    <>
      {type != 'input' ? (
        <Container>
          <Search
            style={{ width: `${width}px` }}
            value={searchKey}
            allowClear
            addonAfter={<Icon type="close-circle-o" />}
            placeholder={placeholder}
            onChange={(e) => {
              handleInputOnchange(e)
            }}
          />
        </Container>
      ) : (
        <InputNumberStyled
          controls={false}
          // value={searchKey}
          placeholder={placeholder}
          onChange={(value) => {
            setSearchKey(value ? value.toString() : '')
          }}
        />
      )}
    </>
  )
}

export default memo(AutoSearchInput)
