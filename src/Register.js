import axios from 'axios';
import React from 'react';
//import {url} from './App'
//import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { toast} from 'react-toastify';
import "./all.css"


function Register(props) {
  //let handleSubmit = async(values)=>{
   // console.log(values)
   // await axios.post("localhost:8000/api/auth/register",values)
  //}
  const formik = useFormik({
    initialValues:{
    username:'',
    email:'',
    password:'',
  },
  validationSchema:yup.object({
    username:yup.string().required('* Required'),
    
   email:yup.string().required('* Required'),
   
   password:yup.number('Enter Number Format').required('* Required').min(1,"not less than 1").max(9999999999,"not greater than 10 digits")
  }),
  
  
  onSubmit:async(value)=>{
    console.log(value)
  await axios.post("https://nodechat-5maz.onrender.com/api/auth/register",value)
  
  .then(res=>{
    toast.success("sucessfully registered!",{
      position:toast.POSITION.TOP_CENTER
    })
    props.history.push("/");
  })
  .catch(err=>{toast.error(err.response.data)}
  )
  
  }
  
  })
  return (
    <div className="pass">
    <div className="p">
    <div className="tab"><h1>NEW REGISTRATION</h1></div>

    <form onSubmit={formik.handleSubmit} >
    <div className='form-group'>
      <label for="username">NAME</label>
     <div>
       <input id="username" 
       name="username" 
       type="username" 
       className="form-control" 
       placeholder="Enter Your Name" 
       onBlur={formik.handleBlur} 
       onChange={formik.handleChange}
       value={formik.values.username}
      /></div> 
      {formik.touched.username && formik.errors.username ? <div style={{color:"red"}}>{formik.errors.username}</div>:null}
    </div>
    </form>


    <form onSubmit={formik.handleSubmit} className=''>
    <div className='form-group'>
      <label for="email">EMAIL</label>
     < div>
       <input id="email"
      name="email" 
      type="email" 
      className="form-control" 
      placeholder="Enter email" 
      onBlur={formik.handleBlur}  
      onChange={formik.handleChange} 
      value={formik.values.email}  
      /></div> 
      {formik.touched.email && formik.errors.email ? <div style={{color:"red"}}>{formik.errors.email}</div>:null}
    </div>
</form>

<form onSubmit={formik.handleSubmit}>
    <div className='form-group'>
      <label for="password">PASSWORD</label>
     <div>
       <input id="password" 
        name="password" 
        type="password" 
        className="form-control"  
        placeholder="Enter password" 
        onBlur={formik.handleBlur} 
        onChange={formik.handleChange} 
        value={formik.values.password} 
        /></div> 
      {formik.touched.password && formik.errors.password ? <div style={{color:"red"}}>{formik.errors.password}</div>:null}
    </div>
   
    <div className="form-group">
    <Button variant="primary" type="submit" >
       SUBMIT
       </Button>
       </div>
       </form>
  </div>   
  </div>
  )
}

export default Register