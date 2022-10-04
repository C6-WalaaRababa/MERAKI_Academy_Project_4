import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MyContext } from "../../App";
import axios from "axios";
const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [BackeMessage, SetBackMessage] = useState("");
  const [status, setstatus] = useState(false)
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

      if (error.response && error.response.data) {
        return SetBackMessage(error.response.data.message);
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
        <button onClick={signin}> log in </button>
        {status ? <div>{BackeMessage}</div> :
          <div>{BackeMessage}</div>}

      </div>
    </>
  )
};
export default Login;
