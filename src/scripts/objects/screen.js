const screen = {
  userProfile: document.querySelector(".profile-data"),

  renderUser(user) {
    this.userProfile.innerHTML = `
      <div class="info">
        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
        <div class="data">
          <h1>${user.name ?? "Não possui nome cadastrado😪"}</h1>
          <p>${user.bio ?? "Não possui bio cadastrada 😭"}</p>
        </div>
      </div>`;

    this.userProfile.innerHTML += `
      <div class="follow">
        <p>👤Seguidores: <span>${user.followers}</span></p>
        <p>👥Seguindo: <span>${user.following}</span></p>
      </div>`;

    let repositoriesItens = "";
user.repositories.forEach((repo) => {
  repositoriesItens += `
    <li>
      <div class="repo-card">
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <div class="repo-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
          <span>👀 ${repo.watchers_count}</span>
          <span>💻 ${repo.language ?? "Não definida"}</span>
        </div>
      </div>
    </li>`;
});

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `
        <div class="repositories section">
          <h2>Repositórios</h2>
          <ul>${repositoriesItens}</ul>
        </div>`;
    }

    if (user.events && user.events.length > 0) {
      this.renderEvents(user);
    }
  },

  renderEvents(user) {
    let eventsItens = "";

    user.events.forEach((event) => {
      if (event.type === "PushEvent") {
        event.payload.commits.forEach((commit) => {
          eventsItens += `
            <li>
              <p class="screen-repo-name">${user.name} fez um commit em:<br> <a href="https://github.com/${
            event.repo.name
          }" target="_blank">${event.repo.name}</a></p>
              <p>${commit.message ?? "Sem mensagem de commit"}</p>
            </li>`;
        });
      } else if (event.type === "CreateEvent") {
        eventsItens += `
          <li>
            <p class="screen-repo-name">${user.name} criou o repositório:<br> <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></p>
          </li>`;
      }
    });

    this.userProfile.innerHTML += `
      <div class="events section">
        <h2 class="screen-repo-name">Eventos Recentes</h2><br><br>
        <ul>${eventsItens}</ul>
      </div>`;
  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
