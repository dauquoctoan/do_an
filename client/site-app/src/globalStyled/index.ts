import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const SContent = styled.div`
    width: 1226px;
    height: 100%;
    margin: 0 auto;
    padding: 0 40px;
`;

export const SHomeContent = styled.div`
    width: 1328px;
    height: auto;
    margin: 0 auto;
    position: relative;
`;

export const SLearnContent = styled.div`
    width: 1080px;
    height: auto;
    margin: 0 auto;
    position: relative;
`;

const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
  body {
    .ant-popover-inner{
        margin-right:50px;
    }
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    color: black;
    .nationality {
        cursor: pointer;
    } .wraper-button {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
        margin-top: 20px;
    }
    .nationality:hover {
        background-color: #f1f3f4;
    }
    .MuiModal-root{
        background-color: rgba(0, 0, 0, 0.5);
    }    
        
    &::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb
    {
        background-color: #000000;
        border: 2px solid #555555;
    }

  }
`;

export default GlobalStyle;
