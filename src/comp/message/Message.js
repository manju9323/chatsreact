import React from 'react'
import "./message.css";
import {format} from "timeago.js"

function Message({message,own}) {
  return (
    <div className={own ?'message own':'message' }>
      <div className='messagetop'>
        <img className='messageimg'
           src="https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg" alt="gjhm"/>
        <p className='messagetext'>{message.text}</p>
      </div>
      <div className='messagebottom'>
     {format(message.createdAt)}
       </div>
  </div>
  )
}

export default Message