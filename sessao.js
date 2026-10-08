import { usuarios } from '../dadosMockados/usuarios.js'

let usuarioAtual = null

function entrar(email, senha){
  const usuario = usuarios.find(item =>
    item.email.toLowerCase() === email.toLowerCase() && item.senha === senha
  )
  if (!usuario) return false
  usuarioAtual = usuario
  return true
}

function sair(){
  usuarioAtual = null
}

function getUsuarioAtual(){
  return usuarioAtual
}

export { entrar, sair, getUsuarioAtual }
