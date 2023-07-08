import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
    const navigate=useNavigate();
    function goBack(){
        navigate(-1);
    }


  return (
    <div className='back-button-box'>
        <button className="back-button" onClick={goBack}>
          Back
        </button>
    </div>
  )
}

export default BackButton