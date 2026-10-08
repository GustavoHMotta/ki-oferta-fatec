import { mapaderotas } from './rotas/rotas.js'
import { navbar } from './navbar/navbar.js'

const app = document.getElementById('app')
navbar(mapaderotas)

function atualizarIcones() {
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

function renderizarPagina() {
  const hash = window.location.hash || '#buscar'
  const rota = mapaderotas.find(tela => tela.url === hash.split('?')[0])

  if (rota) {
    rota.pagina(app)
  } else {
    const erro = mapaderotas.find(tela => tela.url === '#erro')
    erro.pagina(app)
  }

  atualizarIcones()
}

window.addEventListener('hashchange', renderizarPagina)
renderizarPagina()
