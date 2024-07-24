Projeto Orçamento Pessoal

Projeto desenvolvido durante 1º semestre do ano de 2024. é um projeto com técnicas 
CSS, HTML e JAVA SCRIPT simples.



🚀 Tecnologias Utilizadas
HTML5: Utilizado para estruturar o conteúdo das páginas.

CSS3:  Utilizado para estilizar e dar layout às páginas. 
       O arquivo estilo.css define estilos para diversos 
	   elementos da página, como o fundo, fontes, cores 
	   e espaçamentos.
	   
JAVA SCRIPT: Utilizado com técnicas atuais, funções call back, filter, objetos literais
                                            jason

Local Storage: Utilizado para armazenar dados persistentes no navegador. 
               Permite que as despesas sejam armazenadas e recuperadas 
			   mesmo após o fechamento do navegador.
			   
JSON: Utilizado para converter objetos JavaScript em strings para armazenamento e vice-versa.

Manipulação do DOM: Técnicas para criar e atualizar elementos HTML dinamicamente, 
                    como tabelas e modais.
					
Bootstrap: Framework CSS utilizado para estilizar e criar modais de feedback para o usuário.

	   Este projeto combina várias técnicas para criar um sistema simples e eficaz 
	   para gerenciamento de despesas. A utilização de Local Storage permite que 
	   os dados sejam armazenados e acessados de maneira persistente, enquanto a 
	   manipulação do DOM e a validação de dados garantem uma experiência de 
	   usuário robusta e intuitiva.
	   
Gerenciamento de Despesas com JavaScript e Local Storage

1. Introdução
O objetivo deste projeto é criar um sistema para gerenciamento de despesas, 
utilizando JavaScript e Local Storage do navegador. 
O sistema permite cadastrar, visualizar, filtrar e remover despesas.

2. Estrutura de Dados
Classe Despesa
Propósito: Representa uma despesa com atributos como ano, mês, dia, tipo, descrição e valor.
Método validarDados(): Verifica se todos os campos necessários estão preenchidos. 
Se algum campo estiver vazio ou indefinido, o método retorna false.

3. Armazenamento e Manipulação de Dados
Classe Bd
Propósito: Gerenciar o armazenamento das despesas no Local Storage do navegador.

Método getProximoId(): Obtém o próximo ID disponível para uma nova despesa. 
O ID é utilizado para garantir que cada despesa tenha um identificador único.

Método gravar(d): Salva uma nova despesa no Local Storage, convertendo o objeto 
de despesa em uma string JSON para armazenamento.

Método recuperarTodosRegistros(): Recupera todas as despesas armazenadas no 
Local Storage, lidando com possíveis lacunas nos IDs.

Método pesquisar(despesa): Filtra as despesas com base nos critérios fornecidos. 
Permite buscar despesas por ano, mês, dia, tipo, descrição e valor.

Método remover(id): Remove uma despesa específica do Local Storage com base no ID.

4. Interação com o Usuário

Função cadastrarDespesa()
Propósito: Captura os dados do formulário HTML e cria uma nova despesa.
Validação e Feedback: Verifica se os dados estão corretos e exibe uma 
mensagem de sucesso ou erro para o usuário, utilizando modais do Bootstrap.

5. Exibição de Dados

Função carregaListaDespesas(despesas = [], filtro = false)
Propósito: Exibe a lista de despesas em uma tabela HTML.
Processo: Cria linhas e células dinamicamente para mostrar 
os dados das despesas, ajustando o formato e incluindo um botão de 
exclusão para cada despesa.

6. Filtragem de Dados

Função pesquisarDespesa()
Propósito: Permite ao usuário pesquisar despesas com base em critérios fornecidos.
Processo: Cria uma instância de Despesa com os critérios de pesquisa e utiliza o 
método pesquisar da classe Bd para obter e exibir as despesas filtradas.	   
	   
	   