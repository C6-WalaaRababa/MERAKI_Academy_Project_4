import React from "react";
import { useState ,useEffect} from "react";
import axios from "axios"
const Register = () => {
  const role="63317d166ef353aaf6c6ac59"
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [BackeMessage, SetBackMessage] = useState("");
  const [status,setstatus]=useState(false)
  const register=()=>
  {
const userinfo={firstName,lastName,age,city,email,password,role}
 axios.post(`http://localhost:5000/users`,userinfo)
.then((result)=>
{
  SetBackMessage(result.data.message)
  setstatus(true)
})
.catch((error)=>
{
SetBackMessage(error.response.data.message)
setstatus(false)
})
  }


  

  return (
    <>
      <div>Register form</div>
      <div>
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
       <button onClick={register}> Register</button>
       {status?<div>{BackeMessage}</div>:
       <div>{BackeMessage}</div>}
      </div>
    </>
  );
};
export default Register;
