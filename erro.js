function erro(app){
  app.innerHTML = `
    <section class="container">
      <div class="empty">
        <span class="tag">404</span>
        <h1>Rota inexistente</h1>
        <p class="muted">A página que você tentou acessar não existe.</p>
        <a class="button" href="#buscar">Voltar ao início</a>
      </div>
    </section>`
}

export default {
  url: '#erro',
  label: '',
  icon: 'circle-alert',
  pagina: erro
}
