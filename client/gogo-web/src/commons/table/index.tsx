import { Table as Tb } from 'antd'
import { useState } from 'react'
import Configs from '../../configs'
import { IPropTable } from './interface'

const Table = ({
  pagination,
  columns,
  data,
  onChangePram,
  size = 'middle',
  expandedRowRender,
  rowSelection,
  doubleClickRow,
  border,
}: IPropTable) => {
  const newData = Configs.getIndexTable({ data, pagination })
  const [activeExpRow, setActiveExpRow] = useState<Array<any>>([undefined])

  return (
    <div>
      <Tb
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {},
            onDoubleClick: (event) => {
              doubleClickRow && doubleClickRow(record)
            },
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          }
        }}
        size={size}
        bordered={border ? true : false}
        columns={columns}
        dataSource={newData ? newData : undefined}
        expandRowByClick={true}
        expandable={{
          expandedRowRender: expandedRowRender,
          expandedRowKeys: activeExpRow,
          onExpand: (expanded, record) => {
            const keys: any = []
            if (expanded) {
              keys.push(record?.key)
            }
            setActiveExpRow(keys)
          },
        }}
        pagination={
          pagination && onChangePram
            ? {
                current: pagination?.page,
                total: pagination?.total,
                pageSize: pagination?.limit,
                onChange: async (page: number) => {
                  onChangePram(page)
                },
              }
            : false
        }
        rowSelection={rowSelection}
        scroll={{
          x: 800,
          scrollToFirstRowOnChange: true,
        }}
      />
    </div>
  )
}

export default Table
