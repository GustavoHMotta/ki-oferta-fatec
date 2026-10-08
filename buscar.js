import bancas from '../dadosMockados/bancas.js'

function buscar(app){
  const categorias = [...new Set(bancas.map(banca => banca.categoria))]

  app.innerHTML = `
    <div class="container-buscar">
      <h1>Feira do Bairro</h1>
      <p class="subtitulo-buscar">Descubra quais produtores estarão na feira.</p>

      <form class="grupo-input" id="form-busca">
        <label for="input-busca" class="sr-only">Produto, produtor ou banca</label>
        <i data-lucide="search" id="icone-busca" aria-hidden="true"></i>
        <input
          type="search"
          id="input-busca"
          name="busca"
          placeholder="Produto, produtor ou banca"
          aria-label="campo de busca"
          autocomplete="off"
        >
        <button id="btn-busca" type="submit" aria-label="Buscar">
          <i data-lucide="arrow-right" aria-hidden="true"></i>
        </button>
      </form>

      <p class="busca-atencao">Consulte as bancas e descubra produtos, dias, horários e bairros.</p>

      <div class="categorias-busca">
        <p>Categoria</p>
        <ul class="categoria-lista">
          ${categorias.map(categoria => `
            <li class="lista-categoria">
              <a href="#resultados?categoria=${encodeURIComponent(categoria)}">${categoria}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>`

  document.getElementById('form-busca').addEventListener('submit', (evento) => {
    evento.preventDefault()
    const termo = new FormData(evento.currentTarget).get('busca').trim()
    window.location.hash = `#resultados?busca=${encodeURIComponent(termo)}`
  })
}

export default {
  url: '#buscar',
  label: 'buscar',
  icon: 'search',
  pagina: buscar
}
