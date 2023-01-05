import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const SContent = styled.div`
    width: 985px;
    height: 100%;
    margin: 0 auto;
    padding: 0 40px;
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
