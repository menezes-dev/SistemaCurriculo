import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
        --background-color: #2C2C2C;  /* Cor de fundo principal, um cinza escuro suave */
        --container-color: #3D3D3D;  /* Cor para containers, cards, seções */
        --text-color: #EAEAEA;  /* Cor do texto principal, quase branco para bom contraste */
        --accent-color: #FFC107;  /* Cor de destaque (botões, links) - um amarelo suave */
        --border-color: #4F4F4F;  /* Cor para bordas e detalhes sutis */
        --secondary-text-color: #B8B8B8;  /* Cor do texto secundário, um cinza médio */
        --danger-color: #E63946;
        
        --font-family: 'Poppins', sans-serif;  /* Fonte principal da aplicação */
    }


    html, body, #root {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: var(--font-family); 
        background-color: var(--background-color);  
        color: var(--text-color);  
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--text-color);  
    }

    a {
        color: var(--accent-color); 
    }

    button {
        background-color: var(--accent-color);  
        color: var(--background-color);  
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-family: var(--font-family);  
    }

    button:hover {
        background-color: var(--border-color);
        color: var(--text-color)
    }
    
`;

export default GlobalStyle;
