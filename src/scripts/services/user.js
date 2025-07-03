import { baseUrl } from "../variables.js";
async function getUser(userName) {
  const response = await fetch(`${baseUrl}/${userName}`);
  return await response.json();
}

async function getUserEvent(userName) {
  const response = await fetch(
    `https://api.github.com/users/${userName}/events`
  );
  const data = await response.json();
  return data;
}
export { getUser, getUserEvent };
