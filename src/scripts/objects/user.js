const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  followers: 0,
  following: 0,
  repositories: [],
  events: [],
  setInfo(gitHubUser) {
    this.avatarUrl = gitHubUser.avatar_url;
    this.bio = gitHubUser.bio;
    this.userName = gitHubUser.login;
    this.followers = gitHubUser.followers;
    this.following = gitHubUser.following;
    this.name = gitHubUser.name || "Não possui nome cadastrado😪";
  },
  setRepositories(repositories) {
    this.repositories = repositories;
  },
  setEvents(filteredEvents) {
    this.events = filteredEvents;
  },
};

export { user };
