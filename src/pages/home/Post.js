import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {format} from "timeago.js"
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';



function Post({post,refr}) {
  const [user,setUser]=useState([])
  const [open,setOpen]=useState(false)
  const {currentUser}=useSelector(state=>state.user)
  useEffect(()=>{
  const getuser=async()=>{
    const res=await axios(`https://nodechat-5maz.onrender.com/api/user/get?userId=${post.userId}`);
     setUser(res.data)
  }
   getuser()
  },[post._id])

  const dell=async()=>{
     await axios.delete(`https://nodechat-5maz.onrender.com/api/post/delete/${post._id}`,{headers:{'mmm':`${JSON.parse(localStorage.getItem("mmm"))}`}})
      .then( res=>{
    toast.success(res.data)
    refr()
      })
      .catch(err=>{toast.error(err.res.data)})

  }

  const foll=async()=>{
    //console.log(post._id,post.userId) await axios(`http://localhost:8000/api/user/get?userId=${post.userId}`);
    await axios.post("https://nodechat-5maz.onrender.com/api/conversation/get/two",{firstuserId:currentUser._id,seconduserId:post.userId})
    .then(
      await axios(`https://nodechat-5maz.onrender.com/api/user/get?userId=${post.userId}`)
      .then( res=>{
    toast.success(res.data)
   
      })
      .catch(err=>{toast.error(err.res.data)
      }))
    .catch(err=>{toast.error(err.res.data)
  })
   

  }




  return (
<>
<div >
  <div>{user.username}</div>
  <img className="postimg" src={post.imgUrl} alt="post some img"></img>
  <div>{post.subject}</div>
  <div className='bf'>
  <div>{format(post.createdAt)}</div>
  <div className='option' onClick={()=>{setOpen(!open)}}>
    <MoreVertIcon/>
    {open &&
    <div className='butto'>
    <button className='button' onClick={foll}>Follow</button>
    <button className='button' onClick={dell} >Delete</button>
    </div>
    }
  </div>
  </div>
  </div>
  <hr/></>
  )
}

export default Post