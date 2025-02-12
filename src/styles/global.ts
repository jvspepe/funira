import { createGlobalStyle } from 'styled-components';
import ClashDisplayVariableWoff2 from '/fonts/clash-display/ClashDisplay-Variable.woff2';
import ClashDisplayVariableWoff from '/fonts/clash-display/ClashDisplay-Variable.woff2';
import SatoshiVariableWoff2 from '/fonts/satoshi/Satoshi-Variable.woff2';
import SatoshiVariableWoff from '/fonts/satoshi/Satoshi-Variable.woff';
import SatoshiVariableItalicWoff2 from '/fonts/satoshi/Satoshi-VariableItalic.woff2';
import SatoshiVariableItalicWoff from '/fonts/satoshi/Satoshi-VariableItalic.woff';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Clash Display Variable';
    src: url(${ClashDisplayVariableWoff2}) format('woff2'),
        url(${ClashDisplayVariableWoff}) format('woff');        
    font-weight: 200 700;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Satoshi Variable';
    src: url(${SatoshiVariableWoff2}) format('woff2'),
        url(${SatoshiVariableWoff}) format('woff');
    font-weight: 300 900;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Satoshi Variable';
    src: url(${SatoshiVariableItalicWoff2}) format('woff2'),
        url(${SatoshiVariableItalicWoff}) format('woff');       
    font-weight: 300 900;
    font-display: swap;
    font-style: italic;
  }


  *, *::before, *::after {
      margin:0;
      padding: 0;
      box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.fonts.body};  
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  a {
    text-decoration:none;
    color:inherit;
  }

  #root {
    isolation: isolate;
  }

  .firebase-emulator-warning {
    display: none;
  }
`;

export default GlobalStyles;
