# Feira do Bairro

Aplicação web da Feira do Bairro, construída com HTML, CSS e JavaScript puro, seguindo a arquitetura do desafio “O mesmo esqueleto, outro negócio”.

## Como executar

Este projeto foi preparado para funcionar diretamente no navegador com o **Live Server do VS Code**, sem Vite, npm ou Node.js.

1. Abra esta pasta no VS Code.
2. Instale a extensão **Live Server** (se ainda não tiver).
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.

O navegador abrirá a aplicação e a navegação entre as telas acontecerá pelo hash da URL (`#buscar`, `#resultados`, etc.).

> Também é possível abrir `src/index.html` com o Live Server. O `index.html` da raiz existe para facilitar a abertura do projeto.

## Estrutura

```text
feira-do-bairro/
├── index.html
├── docs/
├── src/
│   ├── index.html
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── style.css
│   │   ├── navbar.css
│   │   ├── buscar.css
│   │   ├── resultados.css
│   │   ├── detalhe.css
│   │   ├── publicar.css
│   │   ├── conta.css
│   │   └── erro.css
│   └── js/
│       ├── main.js
│       ├── rotas/rotas.js
│       ├── navbar/navbar.js
│       ├── sessao/sessao.js
│       ├── dadosMockados/
│       └── paginas/
```

## Arquitetura

- SPA em JavaScript puro.
- Roteamento por hash.
- Lista única de rotas em `src/js/rotas/rotas.js`.
- Menu gerado a partir da lista de rotas.
- Cada tela é um módulo com `url`, `label`, `icon` e `pagina`.
- Dados mockados em memória.
- `find`, `filter`, `map`, `push` e estado vazio.
- Layout feito com Flexbox; não utiliza CSS Grid.
- Seis telas: início, resultados, detalhe, publicar, minha conta e rota inexistente.

## Tema

**Feira do Bairro** — o cliente não sabe quais produtores estarão na feira de sábado. O aplicativo permite pesquisar bancas, consultar detalhes, publicar uma banca e visualizar os registros do usuário.

## Dados

O projeto contém 12 bancas mockadas e 4 usuários. Os dados existem somente durante a execução da página e são reiniciados ao atualizar o navegador, conforme o desafio.
