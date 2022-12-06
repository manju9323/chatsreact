import React, { useEffect, useRef, useState } from 'react';
import "./messanger.css"
import Topbar from '../../comp/Topbar/Topbar'
import Conversation from '../../comp/Conversation/Conversation';
import Message from '../../comp/message/Message';
import Chatonline from '../../comp/chatonline/Chatonline';
import Home from "../home/Home"
import axios from 'axios';
import { useSelector } from 'react-redux';
import {io}from "socket.io-client";
import HomeIcon from '@mui/icons-material/Home';

function Messanger() {
 const[conversation,setConversation]=useState([])
 const[currentChat,setcurrentChat]=useState(null)
 const[messages,setMessage]=useState([])
 const[newmessage,setNewMessage]=useState("")
 const[arrivalmessage,setarrivalMessage]=useState(null)
 const[onlineusers,setonlineUsers]=useState([])
 const socket =useRef();
const {currentUser}=useSelector(state=>state.user)
const scrollRef = useRef();

useEffect(()=>{
 socket.current= io("ws://localhost:8900");
 socket.current.on("getmessage",data=>{
    setarrivalMessage({
      sender:data.senderId,
      text:data.text,
      createdAt:Date.now(),
    })
 })
},[])

useEffect(()=>{
 arrivalmessage && currentChat?.members.includes(arrivalmessage.sender) &&
 setMessage((prev)=>[...prev,arrivalmessage])
},[arrivalmessage,currentChat])

useEffect(()=>{
  socket.current.emit("adduser",currentUser._id)
  socket.current.on("getusers",users=>{
   setonlineUsers(currentUser.followings.filter((f)=>users.some((u)=>u.userId === f)))
  })
},[currentUser])
 

 useEffect(()=>{
  const getConversation=async()=>{
    try{
      const res= await axios.get(`http://localhost:8000/api/conversation/get/${currentUser._id}`)
      console.log(res.data)
      setConversation(res.data)
    }
    catch(err){console.log(err)}
  }
  getConversation()
 },[currentUser._id])


 useEffect(()=>{
    const getMessage=async()=>{
      try{
        const res =await axios.get(`http://localhost:8000/api/message/get/${currentChat?._id}`)
        setMessage(res.data);
        console.log(res.data)
      }   
      catch(err){
        console.log(err)
      }
    }
    getMessage()
 },[currentChat])

 const handleSubmit=async(e)=>{
  e.preventDefault()
  const message ={
    sender:currentUser._id,
    text:newmessage,
    conversationId:currentChat._id
  }
  const receiverId =currentChat.members.find(member=>member!== currentUser._id)
 
 socket.current.emit("sendmessage",{
  senderId:currentUser._id,
  receiverId,
  text:newmessage,
 })

try{
 const res=await axios.post("http://localhost:8000/api/message/add",message);
 setMessage([...messages,res.data])
 setNewMessage("")
}
catch(err){
  console.log(err)
}
 }

const refresh=()=>{
 setcurrentChat(null)
}



 useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
 },[messages])


  return (
    <>
      <Topbar/>
      <div className='messanger'>

         <div className='chatmenu'>
             <div className='chatmenuwrapper'>
                 <input placeholder='Search For Frends' className='chatmenuinput'/>
                 {conversation.map((con)=>(
                  <div onClick={()=>setcurrentChat(con)}>
                 <Conversation conversation={con} currentUser={currentUser}/>
                 </div>
                 ))}  
             </div>
         </div>

         <div className='chatbox'>

             <div className='chatboxwrapper'>
              { currentChat ? (<>
                 <HomeIcon onClick={refresh} className='home'/>
                <div className='chatboxtop'>
                  {messages.map((m)=>(
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === currentUser._id}/>
                    </div>
                  ))}
                </div>
                <div className='chatboxbottom'>
                      <textarea className='chatmessageinput' 
                      placeholder='Write Something...'
                      onChange={(e)=>setNewMessage(e.target.value)}
                      value={newmessage}></textarea>
                      <button className='chatsubmitbutton' onClick={handleSubmit}>Send</button>
                </div>
              </>):(   
              <div className='home'>
                <Home/>
              </div>)}
                
             </div>
         </div>


         <div className='chatonline'>
             <div className='chatonlinewrapper'>
              <div className='onmem'>online members</div>
              <hr/>
              <Chatonline 
              onlineusers={onlineusers}
              currentId={currentUser._id}
              setcurrentChat={setcurrentChat}/>
             </div>
         </div>
     </div>
    </>
   
  )
}

export default Messanger