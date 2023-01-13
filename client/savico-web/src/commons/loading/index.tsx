import styled from 'styled-components'
import { COLOR } from '../../configs/theme'

export const LoadingTiktok = () => {
  return (
    <ContainLoadingStyled>
      <div className="wrapper-loading">
        <span className="tiktok"></span>
      </div>
    </ContainLoadingStyled>
  )
}

const ContainLoadingStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  .wrapper-loading {
    margin-top: -35vh;
  }
  .tiktok {
    width: 80px;
    height: 40px;
    position: relative;
    left: 50%;
  }
  .tiktok::before,
  .tiktok::after {
    position: absolute;
    content: '';
    top: 6px;
    background-color: #ff3e9e;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    mix-blend-mode: multiply;
    animation: tiktok 1.5s linear infinite;
  }
  .tiktok::after {
    background-color: #4de8f4;
    animation-delay: 0.75s;
  }
  @keyframes tiktok {
    0%,
    100% {
      top: 3px;
      left: 0px;
      width: 18px;
      height: 18px;
      z-index: 0;
      transform: scale(1);
    }
    25% {
      top: 0px;
      height: 25px;
      width: 25px;
      z-index: 1;
      left: 10px;
      transform: scale(1);
    }
    50% {
      top: 3px;
      width: 18px;
      height: 18px;
      left: 24px;
    }
    75% {
      top: 4px;
      left: 18px;
      width: 14px;
      height: 14px;
      transform: scale(1);
    }
  }
`

const Loading = () => {
  return (
    <LoaderWrapper>
      <div className="loader-wrapper">
        <div className="loader">
          <div className="loader loader-inner"></div>
        </div>
      </div>
    </LoaderWrapper>
  )
}
export default Loading

const LoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* align-items: center; */
  display: flex;
  justify-content: center;
  .loader-wrapper {
    width: 35px;
    height: 35px;
    margin-top: 30vh;
  }
  .loader {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    /* border-top-color: #4bc8eb; */
    border-top-color: ${COLOR.primaryColor};

    /* border-bottom-color: #f13a8f; */
    border-bottom-color: ${COLOR.errorColor};

    border-radius: 50%;
    animation: rotate 5s linear infinite;
  }
  .loader-inner {
    border-top-color: ${COLOR.warningColor};
    /* border-bottom-color: #36f372; */
    border-bottom-color: ${COLOR.successColor};
    animation-duration: 2.5s;
  }

  @keyframes rotate {
    0% {
      transform: scale(1) rotate(360deg);
    }
    50% {
      transform: scale(0.8) rotate(-360deg);
    }
    100% {
      transform: scale(1.2) rotate(360deg);
    }
  }
`
