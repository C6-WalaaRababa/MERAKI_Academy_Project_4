import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Footerpart from "../Foater";
const Register = () => {
  const roleUser = "63317d166ef353aaf6c6ac59";
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [BackeMessage, SetBackMessage] = useState("");
  const [BackeMessage2, SetBackMessage2] = useState("");

  const addUser = async () => {
    const userinfo = {firstName,lastName,age,city,email,password,role:roleUser};
    console.log(userinfo)
    try {
      const result = await axios.post(`http://localhost:5000/users`, userinfo);
      if (result.data. success) 
      {
        SetBackMessage("The user has been created successfully");

        const emailregistration = await axios.post(`http://localhost:5000/sendmail/register`,{email,firstName})
        console.log(emailregistration.data)
      }
       else {
        throw Error;
      }
    } catch (error) {

      SetBackMessage2('Error happened while register, please try again');

  };
}

  return (
    <>
    <div>
      <div className="container">
     <div className="login_form">
     <h1>Register form</h1>
        <input className="input"
          type="text" 
          placeholder="Write your First Name"
          onChange={(e) => {
            setfirstname(e.target.value);
          }}
        ></input>
        <input className="input"
          type="text"
          placeholder="Write your last Name"
          onChange={(e) => {
            setlastname(e.target.value);
          }}
        ></input>
        <input  className="input"
          type="text"
          placeholder="Write your age"
          onChange={(e) => {
            setage(e.target.value);
          }}
        ></input>
        <input  className="input"
          type="text"
          placeholder="Write your city"
          onChange={(e) => {
            setcity(e.target.value);
          }}
        ></input>
        <input  className="input"
          type="email"
          placeholder="Write your email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <input  className="input"
          type="password"
          placeholder="Write your password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
        <button
        onClick={addUser} className="button"> Register </button>
        <div className="true">{BackeMessage}</div> 
        <div className="false">{BackeMessage2}</div> 
        <Footerpart/>
      </div> 
      <div className="img_login"><img src="https://res.cloudinary.com/dzmmijyxh/image/upload/v1665234945/Mobile_login-pana_1_w6ifwh.png"></img></div>
      </div>
     
      </div> 
    </>
  );
};
export default Register;
