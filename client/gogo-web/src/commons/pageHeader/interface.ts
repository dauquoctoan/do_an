import { TagType } from 'antd'
import type {
  JSXElementConstructor,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'

export interface IPropPageHeader {
  ghost?: boolean
  title: string
  subTitle?: string
  extra?: any
  onBack?: any
  tags?:
    | ReactElement<TagType, string | JSXElementConstructor<any>>
    | ReactElement<TagType, string | JSXElementConstructor<any>>[]
    | undefined
  children?: any
  fixed?: boolean
}

// ghost={false}
//       onBack={() => window.history.back()}
//       title="Title"
//       subTitle="This is a subtitle"
//   extra={[
//     <Button key="3">Operation</Button>,
//     <Button key="2">Operation</Button>,
//     <Button key="1" type="primary">
//       Primary
//     </Button>,
//   ]}
