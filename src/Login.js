import axios from 'axios';
import React from 'react';

import {NavLink,Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import "./all.css"
import { useDispatch } from 'react-redux';
import {loginFailure,loginStart,loginSucess} from "./redux/userSlice"




function Login(props) {
  
  const dispatch=useDispatch();

  const formik = useFormik({
    initialValues:{
    email:'',
    password:'',
  },
  validationSchema:yup.object({
    email:yup.string().required('* Required'),
    password:yup.number('enter number format').required('* Required').min(1,"not less than 1").max(9999999999,"not greater than 100000"),

  }),
  
  
  
  onSubmit:async(values)=>{

    await axios.post("http://localhost:8000/api/auth/login",values)
    .then( res=>{
      dispatch(loginSucess(res.data.others))
    localStorage.setItem("mmm",JSON.stringify(res.data.token))
    props.history.push("/mess");
    })

    .catch(err=>{toast.error("invalid user/password")
     dispatch(loginFailure())
    })
  } 
  })

  return (
    <div className="pass">
    <div className="p">
    <div className="tab"><h1>WELCOME TO LOGIN</h1></div>

    
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
     <div className="passlabel">
     <label for="password">PASSWORD</label>
      </div>
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

    <div className="form-group passlabel">
    <Button variant="primary" type="submit" >
       LOGIN
       </Button>
       <NavLink to="/register"><Button className="si" variant="primary" type="submit" >
        NEW REGISTER
       </Button></NavLink>
       </div>

</form>

  </div>   
  </div>
  )
}

export default Login