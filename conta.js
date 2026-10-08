import bancas from '../dadosMockados/bancas.js'
import { entrar, sair, getUsuarioAtual } from '../sessao/sessao.js'

function conta(app){
  const usuario = getUsuarioAtual()

  if (!usuario) {
    app.innerHTML = `
      <section class="container">
        <div class="stack">
          <span class="tag">Minha conta</span>
          <h1>Entrar</h1>
          <p class="muted">Use um dos usuários mockados para testar a aplicação.</p>
        </div>
        <form id="form-login" class="card">
          <div class="field">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" required placeholder="ana@feiradobairro.local">
          </div>
          <div class="field">
            <label for="senha">Senha</label>
            <input id="senha" name="senha" type="password" required placeholder="1234">
          </div>
          <div id="erro-login" aria-live="polite"></div>
          <button class="button" type="submit">Entrar</button>
        </form>
      </section>`

    document.getElementById('form-login').addEventListener('submit', (evento) => {
      evento.preventDefault()
      const dados = Object.fromEntries(new FormData(evento.currentTarget))
      if (!entrar(dados.email, dados.senha)) {
        document.getElementById('erro-login').innerHTML = '<div class="error">E-mail ou senha inválidos.</div>'
        return
      }
      window.location.hash = '#conta'
    })
    return
  }

  const minhasBancas = bancas.filter(banca => banca.publicadorId === usuario.id)

  app.innerHTML = `
    <section class="container">
      <div class="account-head">
        <span class="tag">Minha conta</span>
        <h1>${usuario.nome}</h1>
        <p class="muted">${usuario.email}</p>
      </div>
      <div class="form-actions">
        <a class="button" href="#publicar">Publicar nova banca</a>
        <button id="btn-sair" class="button danger" type="button">Sair</button>
      </div>
      <div class="stack">
        <h2>Minhas bancas (${minhasBancas.length})</h2>
        ${minhasBancas.length === 0 ? '<div class="empty"><p>Você ainda não publicou nenhuma banca.</p></div>' : `
          <ul class="result-list">
            ${minhasBancas.map(banca => `
              <li class="card">
                <span class="tag">${banca.categoria}</span>
                <h3>${banca.nome}</h3>
                <p>${banca.dia} · ${banca.bairro}</p>
                <a class="button secondary" href="#detalhe?id=${banca.id}">Ver detalhes</a>
              </li>`).join('')}
          </ul>`}
      </div>
    </section>`

  document.getElementById('btn-sair').addEventListener('click', () => {
    sair()
    window.location.hash = '#conta'
  })
}

export default {
  url: '#conta',
  label: 'conta',
  icon: 'user-round-arrow-left',
  pagina: conta
}
