import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import PostComponent from "../../components/PostComponent/PostComponent";
import style from "./HomePage.module.css";
import { api } from "../../api/api";

function HomePage() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [ableToRequestWithScroll, setAbleToRequestWithScroll] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  async function getPosts(id, userName) {
    setPosts([...posts, ...(await api.getPostsOfUser(id, userName))]);
  }

  function handleLocalStorage() {
    const localValues = JSON.parse(localStorage.getItem("users"));
    setPosts(Object.values(localValues).flat());
  }

  async function handleUserName(id) {
    try {
      const response = await api.getUserName(id);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  function checkToClearLocalStorage(currentTime, lastTimeChecked) {
    return currentTime - lastTimeChecked > 180000;
  }

  useEffect(() => {
    const currentTime = new Date();
    const lastTimeChecked = localStorage.getItem("lastTimeChecked");
    if(lastTimeChecked) {
      if(checkToClearLocalStorage(currentTime.getTime(), lastTimeChecked)) {
        localStorage.clear();
      }
    } else {
      localStorage.setItem("lastTimeChecked", currentTime.getTime());
    }
    if (localStorage.getItem("users")) {
      handleLocalStorage();
      setUserId(JSON.parse(localStorage.getItem("lastUserId")));
    } else {
      localStorage.setItem("lastUserId", userId);
      handleUserName(userId).then((username) => {
        getPosts(userId, username);
      });
    }
  }, []);

  useEffect(() =>{
    searchValue === ""
      ? setAbleToRequestWithScroll(true)
      : setAbleToRequestWithScroll(false);
    searchValue === "" && userId !== 10
      ? setLoaderVisible(true)
      : setLoaderVisible(false);
  }, [searchValue])

  const handleScroll = (event) => {
    if(!ableToRequestWithScroll) {
      return;
    }
    if(userId === 10) {
      setLoaderVisible(false);
      return;
    }
    const scrolled = event.currentTarget.scrollTop;
    const heightOffset = event.currentTarget.offsetHeight;
    const contentHeight = event.currentTarget.scrollHeight;
    if (scrolled + heightOffset >= contentHeight) {
      handleUserName(userId + 1).then((userName) => {
        if (userName) {
          setUserId(userId + 1);
          getPosts(userId + 1, userName);
          localStorage.setItem("lastUserId", userId + 1);
        }
      });
    }
  };

  function handleSetSearchValue(toSearch) {
    setSearchValue(toSearch);
  }

  function filterPostsWith(value) {
    return posts.filter((e) => e.title.includes(value.toLowerCase()))
  }

  return (
    <div className={style.host} onScroll={handleScroll}>
      <HeaderComponent
        searchValue={searchValue}
        handleSetSearchValue={handleSetSearchValue}
      />
      <div className={style.posts_wrapper}>
        {searchValue === ""
          ? posts.map((el, key) => {
              return (
                <PostComponent
                  key={key}
                  title={el.title}
                  description={el.body}
                  user={el.userName}
                />
              );
            })
          : filterPostsWith(searchValue).length
            ? filterPostsWith(searchValue)
              .map((e,key) => {
                return (
                  <PostComponent
                    key={key}
                    title={e.title}
                    description={e.body}
                    user={e.userName}
                  />
                );
              })
            : <div className={style.no_results_component}>No hay resultados para: "{searchValue}"</div>
        }
        {loaderVisible && (
          <div className={style.loader}>
            <div className={style.loader_component}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
