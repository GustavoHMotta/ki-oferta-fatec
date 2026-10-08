import bancas from '../dadosMockados/bancas.js'

function parametros(){
  const hash = window.location.hash
  const indice = hash.indexOf('?')
  return indice === -1 ? new URLSearchParams() : new URLSearchParams(hash.slice(indice + 1))
}

function resultados(app){
  const params = parametros()
  const termo = (params.get('busca') || '').trim().toLowerCase()
  const categoria = params.get('categoria') || ''
  const ordem = params.get('ordem') || 'dia'

  const encontrados = bancas
    .filter(banca => {
      const texto = [
        banca.nome,
        banca.produtor,
        banca.categoria,
        banca.bairro,
        ...banca.produtos
      ].join(' ').toLowerCase()

      return (!termo || texto.includes(termo)) && (!categoria || banca.categoria === categoria)
    })
    .sort((a, b) => {
      if (ordem === 'produtos') return b.produtos.length - a.produtos.length
      const dias = { 'Sábado': 1, 'Domingo': 2 }
      return dias[a.dia] - dias[b.dia]
    })

  app.innerHTML = `
    <section class="container">
      <div class="stack">
        <a href="#buscar">← Nova busca</a>
        <h1>Resultados</h1>
        <p class="muted">${termo ? `Busca por "${termo}"` : categoria || 'Todas as bancas'} · ${encontrados.length} encontrada(s)</p>
      </div>

      <div class="card">
        <label class="field" for="ordenacao">
          <span>Ordenar por</span>
          <select id="ordenacao">
            <option value="dia" ${ordem === 'dia' ? 'selected' : ''}>Dia da feira</option>
            <option value="produtos" ${ordem === 'produtos' ? 'selected' : ''}>Quantidade de produtos</option>
          </select>
        </label>
      </div>

      ${encontrados.length === 0 ? `
        <div class="empty">
          <i data-lucide="search-x" aria-hidden="true"></i>
          <h2>Nenhuma banca encontrada</h2>
          <p class="muted">Tente outro produto, produtor ou categoria.</p>
        </div>` : `
        <ul class="result-list">
          ${encontrados.map(banca => `
            <li class="card result-card">
              <div class="result-card__top">
                <div class="meta">
                  <span class="tag">${banca.categoria}</span>
                  <h2>${banca.nome}</h2>
                  <p>Produtor: ${banca.produtor}</p>
                </div>
                <strong>${banca.dia}</strong>
              </div>
              <p class="muted">${banca.bairro} · ${banca.horario}</p>
              <p>${banca.produtos.join(', ')}</p>
              <a class="button" href="#detalhe?id=${banca.id}">Ver detalhes</a>
            </li>
          `).join('')}
        </ul>`}
    </section>`

  document.getElementById('ordenacao').addEventListener('change', (evento) => {
    params.set('ordem', evento.currentTarget.value)
    window.location.hash = `#resultados?${params.toString()}`
  })
}

export default {
  url: '#resultados',
  label: 'resultados',
  icon: 'list',
  pagina: resultados
}
