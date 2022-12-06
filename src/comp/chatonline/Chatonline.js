import axios from "axios";
import { useEffect, useState } from "react"
import "./chatonline.css"

function Chatonline({onlineusers,currentId,setcurrentChat }) {
  console.log(onlineusers)
  const [friends,setFriends]=useState([]);
  const [onlineFriends,setonlineFriends]=useState([]);

  useEffect(()=>{
   const getfriends=async()=>{
    const res =await axios.get(`http://localhost:8000/api/user/friends/${currentId}`)
    setFriends(res.data);
   };
   getfriends()
  },[currentId])


  useEffect(()=>{
    setonlineFriends(friends.filter((f)=>onlineusers.includes(f._id)))
  },[friends,onlineusers])

  const handleclick=async(user)=>{
    try{
 const res=await axios.get(`http://localhost:8000/api/conversation/get/two/${currentId}/${user._id}`)
 setcurrentChat(res.data)
    }
    catch(err){
      console.log(err)
    }

  }


  return (
    <div className="chatonline">
      {onlineFriends.map((o)=>(
       
      <div className="chatonlinefriend" onClick={()=>{handleclick(o)}}>
         <div className="chatonlineimgcontainer">
                  <img className="chatonlineimg" src="https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg" alt=""/>
                  <div className="chatonlinebadge"></div>
         </div>
         <span className="chatonlinename">{o.username}</span>
      </div> ))}
    </div>
  )
}

export default Chatonline    