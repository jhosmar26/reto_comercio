import React from 'react'
import style from "./PostComponent.module.css"

function PostComponent({title, description, user}) {
  return <div className={style.post_wrapper}>
    <div className={style.title}>{title}</div>
    <div className={style.body}>{description}</div>
    <div className={style.user}>{user}</div>
    <hr className={style.separator}/>
  </div>
}

export default PostComponent