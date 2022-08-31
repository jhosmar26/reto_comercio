const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const api = {
  getPostsOfUser: async function(userId, userName) {
    const url = BASE_URL + "users/" + userId + "/posts";
    const response = await fetch(url);
    const data = await response.json();
    data.map(el => {
      el.userName = userName
    });

    this.setLocalUserId(userId, data)
    return data;
  },

  getUserName: async function(userId) {
    const url = BASE_URL + "users/" + userId;
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json();
      return data.name;
    }
    throw "error 404"
  },

  setLocalUserId: function(userId, posts) {
    const users = localStorage.getItem("users");

    if (users) {
      localStorage.setItem("users", JSON.stringify({ ...JSON.parse(users), [userId]: posts }));
    } else {
      localStorage.setItem("users", JSON.stringify({ [userId]: posts }))
    };
  },
}