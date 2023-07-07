import React from 'react'
import '../App.css'

function Alert({style,message}) {
  return (
    <div style={style} className='alert'>
        <h3>{message}</h3>
    </div>
  )
}

export default Alert