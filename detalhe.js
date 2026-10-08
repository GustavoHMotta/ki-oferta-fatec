import bancas from '../dadosMockados/bancas.js'
import { usuarios } from '../dadosMockados/usuarios.js'

function detalhe(app){
  const hash = window.location.hash
  const indice = hash.indexOf('?')
  const params = indice === -1 ? new URLSearchParams() : new URLSearchParams(hash.slice(indice + 1))
  const id = params.get('id') || ''

  const banca = bancas.find(item => item.id === id)

  if (!banca) {
    app.innerHTML = `
      <section class="container">
        <div class="empty">
          <h1>Banca não encontrada</h1>
          <p class="muted">O registro informado não existe.</p>
          <a class="button" href="#resultados">Voltar aos resultados</a>
        </div>
      </section>`
    return
  }

  const publicador = usuarios.find(usuario => usuario.id === banca.publicadorId)

  app.innerHTML = `
    <section class="container">
      <a href="#resultados">← Voltar aos resultados</a>
      <article class="card">
        <div class="stack">
          <span class="tag">${banca.categoria}</span>
          <h1>${banca.nome}</h1>
          <p>${banca.descricao}</p>
        </div>
        <ul class="detail-list">
          <li><strong>Produtor:</strong> ${banca.produtor}</li>
          <li><strong>Dia:</strong> ${banca.dia}</li>
          <li><strong>Horário:</strong> ${banca.horario}</li>
          <li><strong>Bairro:</strong> ${banca.bairro}</li>
          <li><strong>Produtos:</strong> ${banca.produtos.join(', ')}</li>
          <li><strong>Publicado por:</strong> ${publicador?.nome || 'Não informado'}</li>
        </ul>
      </article>
    </section>`
}

export default {
  url: '#detalhe',
  label: '',
  icon: 'store',
  pagina: detalhe
}
