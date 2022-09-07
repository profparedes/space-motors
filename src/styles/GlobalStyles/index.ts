import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root{
        
    };

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };

    html, body, #root{
        min-height: 100vh;
    };

    p {
        margin-top: 0;
        margin-bottom: 0;
    }

`;
