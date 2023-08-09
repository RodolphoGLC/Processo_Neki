import React from 'react'
import erro from '../../assets/erro.png'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
      <h1>Página não encontrada😢</h1>
      <img src={erro} alt="" />
    </div>
  )
}

export default NotFound