import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
const LoginEmpolyee = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [BackMessage, setBackMessage] = useState("");
  const navigate = useNavigate();
  const { settoken, logemployee, setlogemployee, setstatelogin } =
    useContext(MyContext);
  const signin =  () => {
    const workerInfo = { email, password };
   // try {
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
    //   setBackMessage(error.response.data.message)
    console.log(error)
    })
  };
//   useEffect(() => {
//     if (logemployee) {
//       navigate("/dashemployee");
//     }
//   }, [logemployee]);

// const godashboard=()=>
// {
//         if (logemployee) 
//         {
//             navigate("/dashemployee");

//         }
 

  return (
    <>
      <div>index</div>

      {!logemployee ? (
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
        </div>
      ) : (
        ""
      )}
      <div>{BackMessage}</div>
    </>
  );
};

export default LoginEmpolyee;
