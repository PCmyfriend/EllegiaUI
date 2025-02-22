import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: Roboto, 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Roboto, Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .centered-container {
    width: 80%;
    margin: auto;
  }
  
  .nav-bar-icon {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
