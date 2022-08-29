import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import PostComponent from '../../components/PostComponent/PostComponent'
import style from './HomePage.module.css'
import { api } from '../../api/api'



function HomePage() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);


  async function getPosts(id, userName) {
    setPosts([ ...posts, ...await api.getPostsOfUser(id, userName)])
  }


  function handleLocalStorage() {
    const localValues = JSON.parse(localStorage.getItem("users"));
    setPosts(Object.values(localValues).flat());
  }

  async function handleUserName(id) {
    const response = await api.getUserName(id);
    return response
  }

  useEffect(() => {
    if(localStorage.getItem("users")) {
      handleLocalStorage();
      setUserId(JSON.parse(localStorage.getItem("lastUserId")));
    } else {
      localStorage.setItem("lastUserId", userId);
      handleUserName(userId).then((username) => {
        getPosts(userId, username);
      })
    }
  }, []);

  const handleScroll = event =>{
    const scrolled = event.currentTarget.scrollTop;
    const heightOffset = event.currentTarget.offsetHeight;
    const contentHeight = event.currentTarget.scrollHeight;
    if (scrolled + heightOffset === contentHeight) {
      handleUserName(userId + 1).then(userName => {
        getPosts(userId + 1, userName);
      })
      setUserId(userId + 1);
      localStorage.setItem("lastUserId", userId);
    }
  }

  return <div>
    <HeaderComponent/>
    <div className={style.posts_scroll} onScroll={handleScroll}>
      <div className={style.posts_wrapper}>
        {posts.map((el, key)=>{
          return <PostComponent key={key} title={el.title} description={el.body} user={el.userName}/>
        })}
        <div className={style.loader}>
          <div className={style.loader_component}></div>
        </div>
      </div>
    </div>
  </div>
}

export default HomePage