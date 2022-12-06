import React from 'react'
import "./Topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FaceIcon from '@mui/icons-material/Face';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';


function Topbar() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='topbar'>
      <div className='left'>
           <div className='home'>MAGO CHAT <Link to="/mess"><HomeIcon/></Link> </div>
           
           <div className='search'>
               <SearchIcon/>
              <input className='searchin' type="text" placeholder="Search for friend,post or video"/>
              
           </div>
      </div>
      <div className='right'>
           <div className='r1'>
              <div>Homepage</div>
               <div>Timeline</div>
           </div>
           <div className='r2'>
               <AccountCircleIcon/>
               <ChatIcon/>
               <NotificationsActiveIcon/>
           </div>
           {!currentUser ? 
           <><div className='r3'>
                 <FaceIcon/>
           </div></>
           :<>
           <div className='r3'>
                 <FaceIcon/>{currentUser.username}
           </div>
           
           </>}
           
      </div>

    </div>
    
  )
}

export default Topbar