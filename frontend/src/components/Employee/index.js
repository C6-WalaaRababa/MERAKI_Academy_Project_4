import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
const LoginEmpolyee = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [BackMessage, setBackMessage] = useState("");
  const navigate = useNavigate();
  const { settoken, setlogemployee, setstatelogin } =
    useContext(MyContext);
  const signin =  () => {
    const workerInfo = { email, password };
   
   axios.post(
        `http://localhost:5000/employee/login`,
        workerInfo
      ).then(result=>
      {
    
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("statelogin", result.data.state);
        setstatelogin(result.data.state);
        settoken(result.data.token);
        setlogemployee(true);
        navigate("/dashemployee");
       } )
    
    .catch ((error) =>{
      setBackMessage(error.response.data.message)
    console.log(error)
    })
  };

 

  return (
    <>
        <div className="container">
          <div className="login_form">
            <h1> Login Empolyee Form</h1>
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
          <button onClick={signin} className="button"> log in </button>
        </div>
      <div className="false">{BackMessage}</div>
      <div className="img_login"><img src="https://res.cloudinary.com/dzmmijyxh/image/upload/v1665234932/Secure_login-pana_1_tgtg3g.png"></img></div>
      </div>
    </>

  );
};

export default LoginEmpolyee;
