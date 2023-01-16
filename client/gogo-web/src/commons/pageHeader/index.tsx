import { Affix, PageHeader as Header } from 'antd'
import styled from 'styled-components'
import style from '../../configs/style'
import { IPropPageHeader } from './interface'

const PageHeader = ({
  extra,
  onBack,
  subTitle,
  ghost,
  tags,
  title,
  children,
  fixed,
}: IPropPageHeader) => {
  const Children = children
  return (
    <PageHeaderStyled
      ghost={ghost}
      onBack={onBack}
      title={title}
      subTitle={subTitle}
      tags={tags}
      extra={extra}
    >
      {children ? <Children /> : null}
    </PageHeaderStyled>
  )
}

export default PageHeader

const PageHeaderStyled = styled(Header)<any>`
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 4px 20px !important;
  margin: 5px;
  align-items: 'center';
  .ant-page-header-heading-title {
    font-size: ${style.font.large.size};
    font-weight: ${style.font.middle.weight};
    color: ${style.colorText.primaryColor};
  }
  .ant-page-header-heading-sub-title {
    font-size: ${style.font.middle.size};
    font-weight: ${style.font.middle.weight};
    color: ${style.colorText.primaryColor};
  }
  & .ant-page-header-heading-left {
    margin: 0;
  }
`
