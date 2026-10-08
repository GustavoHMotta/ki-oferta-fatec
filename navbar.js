function navbar(item_menu){
  const navbar = document.getElementById('navbar');

  navbar.innerHTML = `
    <nav class="navbar">
      <a class="navbar-brand" href="#buscar">🥕 Feira do Bairro</a>
      <ul class="navbar-links">
        ${
          item_menu
            .filter(menu => menu.label !== '')
            .map((item) => {
              return `<li><a href="${item.url}" class="navbar-item">
                <i data-lucide="${item.icon}" aria-hidden="true"></i>
                <span>${item.label}</span>
              </a></li>`
            }).join('')
        }
      </ul>
    </nav>`;
}

export { navbar };
