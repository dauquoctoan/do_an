import styled from 'styled-components'
import style from '../../configs/style'
import Loading from '../loading'
import { IPropsContentScreen, IWrapperContentStyled } from './interface'

const ContentScreen = ({
  children,
  sizeSpin,
  loading = false,
  countFilter,
  logo = true,
}: IPropsContentScreen) => {
  return (
    <>
      <WrapperContentStyled loading={loading ? 'true' : 'false'}>
        <ContentStyled>
          {(countFilter || countFilter === 0) && (
            <div className="count-filter">
              Kết quả lọc: <span> {countFilter}</span>
            </div>
          )}
          {children}
        </ContentStyled>
        {/* {logo && <div className="logo">SAVICO ©2022</div>} */}
        <div className="loading">
          <Loading />
        </div>
      </WrapperContentStyled>
    </>
  )
}

export default ContentScreen

export const ContentStyled = styled.div`
  padding: ${style.padding.all};
  background-color: white;
  .count-filter {
    margin: 5px 0px 10px 10px;
    span {
      font-weight: 600;
      font-size: 16;
    }
  }
`

export const WrapperContentStyled = styled.div<IWrapperContentStyled>`
  position: relative;
  width: auto;
  min-height: calc(100vh - 175px);
  margin: 5px;
  .logo {
    text-align: center;
    padding: 4px;
  }
  .loading {
    background-color: rgba(243, 233, 233, 0.5);
    display: ${(style: IWrapperContentStyled) =>
      style?.loading == 'true' ? 'flex' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`
