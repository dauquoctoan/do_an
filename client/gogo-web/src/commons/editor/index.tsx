import { Form, FormInstance, FormItemProps } from 'antd'
import React, { useEffect, useRef } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditorCore from 'suneditor/src/lib/core'
import plugins from 'suneditor/src/plugins'
import style from '../../configs/style'

interface IProps extends FormItemProps {
  onChange?: (values?: string) => any
  placeholder?: string
  disable?: boolean
  form: FormInstance
  loading?: boolean
  height?: string
  setIsAllSpace?: any
}

const SunEditorComponent: React.FC<IProps> = ({
  onChange,
  placeholder,
  loading,
  disable,
  form,
  setIsAllSpace,
  height = '300px',
  ...rest
}) => {
  const buttonList = [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link' /** ,'math' */],
    ['fullScreen', 'showBlocks'],
    ['image'],
  ]

  const formInstances = useRef<FormInstance>()
  const editor = useRef<SunEditorCore>()

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  useEffect(() => {
    formInstances.current = form
  }, [])

  useEffect(() => {
    loading &&
      setTimeout(() => {
        editor.current?.setContents(
          formInstances.current?.getFieldValue({ ...rest }.name as string)
        )
      }, 1000)
  }, [loading])

  return (
    <Form.Item {...rest}>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        placeholder={placeholder}
        setAllPlugins={false}
        disable={disable}
        setOptions={{
          height: height,
          plugins: plugins,
          buttonList: buttonList,
        }}
        setDefaultStyle={`font-family: Poppins, sans-serif; margin: 0; padding: 0; font-size: ${style.font.middle}; height: 360px;`}
        onChange={(content) => {
          onChange && onChange(content)
          formInstances.current?.setFieldsValue({
            [{ ...rest }.name as string]: content,
          })
        }}
      />
    </Form.Item>
  )
}

export default SunEditorComponent
