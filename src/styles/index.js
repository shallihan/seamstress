import { createGlobalStyle } from "styled-components";
import '../fonts/fonts.css';

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: 'PT Root';
    font-size: 16px;
    line-height: 1.5;
    background-color: #000000;
    color: #ffffff;
  }
`;

export default GlobalStyles;
