import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
import { getUserEvent } from "./services/user.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub");
    return true;
  }
}
async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getUserEvent(userName);
  const filteredEvents = eventsResponse
    .filter(
      (event) => event.type === "PushEvent" || event.type === "CreateEvent"
    )
    .slice(0, 10);

  user.setEvents(filteredEvents);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  
  screen.renderUser(user);
}
