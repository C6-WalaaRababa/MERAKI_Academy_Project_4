import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import "./style.css"
import axios from "axios";
const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [BackeMessage, SetBackMessage] = useState("");
  const { isloggedin, setisloggedin, settoken, setstatelogin} = useContext(MyContext)
  const navigate = useNavigate();
  const signin = async () => {
    const userInfo = { email, password }
    try {
      const result = await axios.post(`http://localhost:5000/users/login`, userInfo)
      if (result.data.success
        ) {
    
        localStorage.setItem("token", result.data.token)
        settoken(result.data.token);
        setisloggedin(true)
        SetBackMessage(result.data.message);
        localStorage.setItem("statelogin",result.data.state)
        setstatelogin(result.data.state)

      }
      else {
        throw Error
      }
    }
    catch (error) {

      {
       SetBackMessage(error.response.data.message);
      }

    }
  }
  useEffect(() => {

    if (isloggedin) {
      navigate("/home");
    }
  }, [isloggedin]);


  return (
    <>
      <div className="container">
     
       <div className="login_form">
        <h1>Login form User</h1>
        <input className="input"
          type="email"
          placeholder="write your email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <input className="input"
          type="password"
          placeholder="write your password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
        <button  onClick={signin} className="button"> log in </button>
          <div className="false">{BackeMessage}</div>
      </div> 
      <div className="img_login">
            <img src="https://res.cloudinary.com/dzmmijyxh/image/upload/v1665167493/my%20image/Login-bro_bb34bz.png"></img>
          </div>
      </div>
    </>
  )
};
export default Login;
