import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const SContent = styled.div`
    width: 985px;
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
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: black;
    .nationality {
        cursor: pointer;
    }
    .nationality:hover {
        background-color: #f1f3f4;
    }
  }
`;

export default GlobalStyle;
