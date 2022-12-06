import React, { useEffect, useState } from 'react'
import "./home.css";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import Post from './Post';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

function Home() {
  const [getpost,setPost]=useState([])
  const [openpost,setopenPost]=useState(false)
  const {currentUser}=useSelector(state=>state.user)
  const [imgUrl,setimg]=useState("")
  const [subject,settitle]=useState("")



  const post=async()=>{
    if(imgUrl && subject)
    {
    await axios.post("https://nodechat-5maz.onrender.com/api/post/post",{imgUrl,subject},
    {headers:{'mmm':`${JSON.parse(localStorage.getItem("mmm"))}`}}
    )
    .then( res=>{
      setimg("")
      settitle("")
  toast.success(`Post sucessfull${currentUser.username}`)
  postget()
    })
    .catch(err=>{toast.error("not vali format/must have account")
    })
  }
  else{
    toast.error("must fill the form")
  }
  }

  const postget=async()=>{
    const res=await axios.get("https://nodechat-5maz.onrender.com/api/post/get")
    setPost(res.data)
 }
  useEffect(()=>{
    postget()
  },[])

  return (
    <div className='posthome'>
      <div className='homeboxtop'>
    {getpost.map((p)=>
       <Post key={getpost._id} post={p} refr={postget}/>
          )}
      </div>
     <div className='homeboxbottom'>
      <abbr title="New Post"> <EditIcon  className='compose' onClick={()=>{setopenPost(!openpost)}}/></abbr>
      { openpost && (<>
      <div className='postbox'>
      <label name="imgUrl">Image</label>
      <input
       className='imgUrlin' placeholder='url in jpgformat' value={imgUrl} onChange={(e)=>{setimg(e.target.value)}}/>
       <label name="subject">Title</label>
      <input
       className='subjectin' placeholder='subject...'  value={subject}  onChange={(e)=>{settitle(e.target.value)}}/>
       <SendIcon className="sendicon" onClick={post}/>
       </div>
      </>)
      }
     </div>
    </div>
  )
}

export default Home