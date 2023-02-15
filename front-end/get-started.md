# Get started: Front-end

Lista de ferramentas e formatações utilizadas no desenvolvimento do front-end.

 1. ####  [Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)

	 
	*Instalação no node:*

	    npm install react-bootstrap bootstrap
	    
	*Utilização*:

	 a. Adicionar o link de css ao *`<head>`*:

	    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
	    />

	b. Importar os componentes que deseja utilizar individualmente. No caso de um botão, por exemplo:

		import Button from 'react-bootstrap/Button';
--- 
 2. ####  [Material Icons](https://developers.google.com/fonts/docs/material_symbols?hl=pt-br#use_in_web)

	*Utilização*:

	 a. Adicionar os links ao *`<head>`*:

	    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	    
	 b. Para adicionar os ícones, utilizar a tag `<span>`. Exemplo: 

	    <span class="material-icons">face</span>

	c. Utilizaremos o estilo "Rounded", e os ícones podem ser consultados [aqui](https://fonts.google.com/icons?icon.style=Rounded).
--- 
 3. ####  [Fonte: Roboto Family](https://developers.google.com/fonts/docs/material_symbols?hl=pt-br#use_in_web)

	*Instalação*:

	 a. Adicionar os links ao *`<head>`*:

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

	 b. Adicionar a família na raiz do arquivo de css primário: 

		:root {
		    font-family: 'Roboto', sans-serif;
		  }

--- 
 4. ####  [Paleta de cores](https://coolors.co/1dbeb4-383b58-545776-f3f1ed)

	*Instalação*:

	 a. Adicionar as variáveis de cores da paleta na raiz do arquivo de css primário. A cor primnária será `--green-light` e a secundária `--navy-light`. No arquivo, colar:

		:root {
		/* Cor primária */
		--green-light: #1dbeb4;
		--green-medium: #22958d;
		--green-dark: #226e68; 

		/* Cor secundária */	  
		--navy-light: #383b58;
		--navy-medium: #2e3047;
		--navy-dark: #242536;

		/* Cor terciária*/	  
		--coral-light: #545776;
		--coral-medium: #44465e;
		--coral-dark: #343546;

		/* Cor de fundo*/	  
		--gray-light: #f3f1ed;
		--gray-medium: #bdbcb9;
		--gray-dark: #8a8987;
		--gray-darker: #5a5a58;
		--gray-darkest: #2e2e2e;
		}


	 b. para utilizar a coloração, basta basta utilizar a propriedade `var(--nomeDaCor)`. Exemplo:

		body {
		  background-color: var(--green-light);
		  color: var(--navy-medium);
		}


--- 
 5. ####  [Títulos e textos](#)

	*Instalação*:

	 a. Adicionar nos arquivos de raiz do CSS:

	    h1 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 24px;
		    line-height: 28px;
	    }
	    
	    h2 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 20px;
		    line-height: 23px;
	    }
	    
	    h3 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 16px;
		    line-height: 19px;
	    }
	    
	    h4 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 14px;
		    line-height: 16px;
	    }
	    
	    h5 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 16px;
		    line-height: 19px;
	    }
	    
	    h6 {
		    font-style: normal;
		    font-weight: 700;
		    font-size: 14px;
		    line-height: 16px;
	    }
	    
	    .text-normal {
		    font-style: normal;
		    font-weight: 500;
		    font-size: 14px;
		    line-height: 16px;
	    }
	    
	    .text-small {
		    font-style: normal;
		    font-weight: 500;
		    font-size: 12px;
		    line-height: 14px;
	    }

