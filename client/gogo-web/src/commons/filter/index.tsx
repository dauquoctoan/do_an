import { Button, DatePicker, Input, Select } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import Search from 'antd/lib/input/Search'

import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Configs from 'configs'
import style from 'configs/style'
import { IListFilter, IPropFilter, IPropSelect, ISelect } from './interface'
import AutoSearchInput from 'commons/autoSearchInput/AutoSearchInput'
const { Option } = Select

const SelectItem = ({
  placeholder,
  data,
  setFilter,
  listFilter,
  size,
  keyName,
  width = 250,
  showSearch,
}: IPropSelect) => {
  const handleChangeSelect = (keyChange: string | number | null) => {
    setFilter({ ...listFilter, [keyName]: keyChange ? keyChange : null })
  }

  return (
    <Select
      style={{ width: width || 250 }}
      size={size}
      onChange={handleChangeSelect}
      placeholder={placeholder}
      allowClear={true}
      filterOption={
        showSearch
          ? (input, option) => {
              return (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          : undefined
      }
      showSearch={showSearch}
    >
      {data &&
        Object.keys(data).map((key: string) => (
          <Option key={Number(key)}>{data[key]}</Option>
        ))}
    </Select>
  )
}

const FilterHeader = ({
  datePicker,
  onChangeFilter,
  search,
  select,
  size,
  totalItem,
  button,
  selectOriginCustomer,
}: IPropFilter) => {
  const { RangePicker } = DatePicker
  const [listFilter, setListFilter] = useState<IListFilter>({})

  const handleChangeDate = (e: any) => {
    setListFilter({
      ...listFilter,
      fromDate: e ? moment(e[0]).format(Configs._formatDate) : null,
      toDate: e ? moment(e[1]).format(Configs._formatDate) : null,
    })
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return datePicker?.future
      ? current && current > moment().endOf('day')
      : current && current == moment().endOf('day')
  }

  useEffect(() => {
    onChangeFilter && onChangeFilter(listFilter)
  }, [listFilter])

  return (
    <FilterStyled>
      {search && (
        <AutoSearchInput
          width={search?.width}
          placeholder={search?.placeholder}
          onSearchSubmit={(value: any) =>
            setListFilter({ ...listFilter, searchKey: value.trim() })
          }
        />
      )}
      {select &&
        select.map((item: ISelect, index: number) => {
          return (
            <FilterItemStyled key={index}>
              <SelectItem
                showSearch={item.showSearch}
                keyName={item.key}
                size={size}
                placeholder={item.placeholder}
                data={item.data}
                setFilter={setListFilter}
                listFilter={listFilter}
                width={item.width}
              />
            </FilterItemStyled>
          )
        })}
      {selectOriginCustomer &&
        selectOriginCustomer.map((item: ISelect, index: number) => {
          return (
            <FilterItemStyled key={index}>
              <SelectItem
                showSearch={item.showSearch}
                keyName={item.key}
                size={size}
                placeholder={item.placeholder}
                data={item.data}
                setFilter={setListFilter}
                listFilter={listFilter}
                width={item.width}
              />
            </FilterItemStyled>
          )
        })}

      {datePicker && (
        <FilterItemStyled>
          <RangePicker
            style={{ width: datePicker.width || 250 }}
            format={Configs._formatDate}
            allowClear={true}
            disabledDate={disabledDate}
            className="filter-item"
            size={size}
            onChange={handleChangeDate}
          />
        </FilterItemStyled>
      )}
      {button && (
        <FilterItemStyled style={{ marginRight: '0px' }}>
          <Button
            style={{ width: button.width || 250 }}
            type="primary"
            danger={button.type === 'add' ? false : true}
            onClick={button.onClick}
          >
            {button.title}
          </Button>
        </FilterItemStyled>
      )}
      {totalItem && (
        <FilterItemStyled>
          <div className="total-filter-result" style={totalItem.style}>
            {totalItem.desc || 'Kết quả lọc: '} {totalItem.total || 0}{' '}
            {totalItem.suffix || ''}
          </div>
        </FilterItemStyled>
      )}
    </FilterStyled>
  )
}

export default FilterHeader

const FilterStyled = styled.div`
  width: auto;
  background-color: white;
  /* border-bottom: ${style.border}; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px;
  .total-filter-result {
    color: ${style.colorText.primaryColor};
    font-size: ${style.font.small.size};
  }
  font-size: ${style.font.middle};
  .filter-item {
    width: 230px;
  }
`
const FilterItemStyled = styled.div`
  padding: 10px;
  margin-left: 10px;
`
