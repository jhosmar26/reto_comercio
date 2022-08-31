import React from 'react'
import style from "./SearcherComponent.module.css";

function SearcherComponent({searchValue, handleSetSearchValue}) {
  return <>
    <input
      type="text"
      placeholder='Buscar...'
      value={searchValue}
      className={style.input}
      onChange={(e) => handleSetSearchValue(e.target.value)}
    />
  </>
}

export default SearcherComponent