import bancas from '../dadosMockados/bancas.js'
import { getUsuarioAtual } from '../sessao/sessao.js'

function publicar(app){
  const usuario = getUsuarioAtual()

  if (!usuario) {
    app.innerHTML = `
      <section class="container">
        <div class="empty">
          <h1>Entre para publicar</h1>
          <p class="muted">É necessário estar logado para cadastrar uma banca.</p>
          <a class="button" href="#conta">Ir para minha conta</a>
        </div>
      </section>`
    return
  }

  app.innerHTML = `
    <section class="container">
      <div class="stack">
        <span class="tag">Publicar</span>
        <h1>Cadastre sua banca</h1>
        <p class="muted">Publicador atual: ${usuario.nome}</p>
      </div>

      <form id="form-publicar" class="card">
        <div class="field">
          <label for="nome">Nome da banca</label>
          <input id="nome" name="nome" required maxlength="80" placeholder="Ex.: Horta da Família">
        </div>
        <div class="field">
          <label for="categoria">Categoria</label>
          <input id="categoria" name="categoria" required maxlength="50" placeholder="Ex.: Hortaliças">
        </div>
        <div class="field">
          <label for="produtos">Produtos</label>
          <input id="produtos" name="produtos" required placeholder="Separe os produtos por vírgula">
        </div>
        <div class="field">
          <label for="dia">Dia</label>
          <select id="dia" name="dia" required>
            <option value="">Selecione</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>
        <div class="field">
          <label for="horario">Horário</label>
          <input id="horario" name="horario" required placeholder="Ex.: 07:00–12:00">
        </div>
        <div class="field">
          <label for="bairro">Bairro</label>
          <input id="bairro" name="bairro" required maxlength="60">
        </div>
        <div class="field">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" required maxlength="160" rows="4"></textarea>
        </div>
        <div id="aviso-publicar" aria-live="polite"></div>
        <div class="form-actions">
          <button class="button" type="submit">Publicar banca</button>
          <a class="button secondary" href="#buscar">Cancelar</a>
        </div>
      </form>
    </section>`

  document.getElementById('form-publicar').addEventListener('submit', (evento) => {
    evento.preventDefault()
    const dados = Object.fromEntries(new FormData(evento.currentTarget))
    const produtos = dados.produtos.split(',').map(produto => produto.trim()).filter(Boolean)

    const repetido = bancas.find(banca =>
      banca.publicadorId === usuario.id &&
      banca.nome.toLowerCase() === dados.nome.trim().toLowerCase() &&
      banca.dia === dados.dia
    )

    if (repetido) {
      document.getElementById('aviso-publicar').innerHTML = '<div class="error">Essa banca já foi publicada por você nesse dia.</div>'
      return
    }

    bancas.push({
      id: `b${Date.now()}`,
      nome: dados.nome.trim(),
      produtor: usuario.nome,
      categoria: dados.categoria.trim(),
      produtos,
      dia: dados.dia,
      horario: dados.horario.trim(),
      bairro: dados.bairro.trim(),
      descricao: dados.descricao.trim(),
      publicadorId: usuario.id
    })

    window.location.hash = '#conta'
  })
}

export default {
  url: '#publicar',
  label: 'publicar',
  icon: 'arrow-up-from-line',
  pagina: publicar
}
