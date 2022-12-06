import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./conversation.css"

function Conversation({conversation,currentUser}) {
   const [user,setUser]=useState("");
   //const {currentUser}=useSelector(state=>state.user)
        
   useEffect(()=>{
    const friendId=conversation.members.find(m=> m !== currentUser._id)
    const getuser = async ()=>{
      try{
        const res=await axios(`http://localhost:8000/api/user/get?userId=${friendId}`);
       setUser(res.data)
      }
      catch(err){
         console.log(err)
      }
    }
    getuser()
   },[conversation._id,currentUser]) 

   
  return (
    <div className='conversation'>
       <img className='conversationimg'
       src="https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg"
       alt="gjhm"
       />
       <span className='conversationname'>{user.username}</span>

    </div>
  )
}

export default Conversation