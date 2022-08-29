const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const api = {
  getPostsOfUser: async function(userId, userName) {
    // const userName = await this.getUserName(userId);

    const response = await fetch(BASE_URL + "users/" + userId + "/posts");
    const data = await response.json();
    data.map(el => {
      el.userName = userName
    });

    this.setLocalUserId(userId, data)
    return data;
  },

  setLocalUserId: function(userId, posts) {
    const users = localStorage.getItem("users");

    if (users) {
      localStorage.setItem("users", JSON.stringify({ ...JSON.parse(users), [userId]: posts }));
    } else {
      localStorage.setItem("users", JSON.stringify({ [userId]: posts }))
    };
  },

  getUserName: async function(userId) {
    const response = await fetch(BASE_URL + "users/" + userId);
    const data = await response.json();
    return data.name;
  }
}