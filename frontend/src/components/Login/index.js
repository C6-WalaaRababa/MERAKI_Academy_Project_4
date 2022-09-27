import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MyContext } from "../../App";
import axios from "axios";
const Login = () => {
  const [email,setemail]=useState("")
 const [password,setpassword]=useState("")
 const [BackeMessage, SetBackMessage] = useState("");
 const [status,setstatus]=useState(false)
 const {isloggedin ,setisloggedin, settoken } = useContext(MyContext)
 const navigate=useNavigate();
const login=()=>
{
const userInfo={email,password}
axios.post(`http://localhost:5000/users/login`,userInfo)
.then((result)=>
{
  
SetBackMessage(result.data.message)
localStorage.setItem("token", result.data.token)
settoken(result.data.token);
setisloggedin(true)
})
.catch((error)=>
{
  SetBackMessage(error.response.data.message)
  setstatus(false)
})
}
useEffect(()=>
{
if(isloggedin)
navigate("/home")


})

  return (
<>
<div> login form  as user </div>
<div>
<input
          type="email"
          placeholder="Write your email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Write your password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
        <button onClick={login}> log in </button>
        {status?<div>{BackeMessage}</div>:
       <div>{BackeMessage}</div>}
   
</div>
</>
  )
};
export default Login;
