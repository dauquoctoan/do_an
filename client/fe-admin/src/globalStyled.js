import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, sans-serif;
    margin: 0;
    padding: 0;
    font-size: 18px;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #bababa;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #9c9c9c;
    }
  }
  

`;

export default GlobalStyle;
