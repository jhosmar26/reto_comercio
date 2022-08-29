import React from 'react'
import SearcherComponent from '../SearcherComponent/SearcherComponent.jsx'
import styles from "./HeaderStyles.module.css"

function HeaderComponent() {
  return (
    <div className={styles.header_bg}>
      <div className={styles.header_wrapper}>
        <div>Minuto a minuto</div>
        <SearcherComponent/>
      </div>
    </div>
  )
}


export default HeaderComponent

// import React from 'react'

// function HeaderComponent() {
//   return (
//     <div>HeaderComponent</div>
//   )
// }

// export default HeaderComponent