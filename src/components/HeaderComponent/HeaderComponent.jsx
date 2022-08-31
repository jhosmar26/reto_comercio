import React from 'react'
import SearcherComponent from '../SearcherComponent/SearcherComponent.jsx'
import styles from "./HeaderComponent.module.css"

function HeaderComponent({searchValue, handleSetSearchValue}) {
  return (
    <div className={styles.header_bg}>
      <div className={styles.header_wrapper}>
        <div>Minuto a minuto</div>
        <SearcherComponent searchValue={searchValue} handleSetSearchValue={handleSetSearchValue}/>
      </div>
    </div>
  )
}


export default HeaderComponent
