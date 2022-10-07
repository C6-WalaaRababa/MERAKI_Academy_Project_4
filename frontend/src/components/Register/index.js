import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { MyContext } from "../../App";
const Register = () => {
  const role = "63317d166ef353aaf6c6ac59";
  const {isloggedin}=useContext(MyContext)
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [BackeMessage, SetBackMessage] = useState("");
  const [status, setstatus] = useState(false);
  const addUser = async () => {
    const userinfo = { firstName, lastName, age, city, email, password, role };
    try {
      const result = await axios.post(`http://localhost:5000/users`, userinfo);
      console.log(result);
      if (result.data.sucsses) {
        setstatus(true);
        SetBackMessage(result.data.message);
        const emailregistration = await axios.post(`http://localhost:5000/sendmail/register`, { email, firstName })
        console.log(emailregistration.data)
      } else {
        throw Error;
      }
    } catch (error) {
      setstatus(false);
     {
       SetBackMessage("Error happened while register, plz try again");
      }
    }
  };
  

  return (
    <>
      <div>Register form</div>
      {
      !isloggedin ?<div className="register-form">
        <input
          type="text"
          placeholder="Write your First Name"
          onChange={(e) => {
            setfirstname(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Write your last Name"
          onChange={(e) => {
            setlastname(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Write your age"
          onChange={(e) => {
            setage(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Write your city"
          onChange={(e) => {
            setcity(e.target.value);
          }}
        ></input>
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
        <button onClick={addUser}> Register</button>
        {status ? <div>{BackeMessage}</div> : <div>{BackeMessage}</div>}
      </div> :<h4> plz log out before</h4>}
    </>
  );
};
export default Register;
