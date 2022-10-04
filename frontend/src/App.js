import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { createContext, useState, useEffect } from "react";
import Navigation from "./components/navbar";
import Register from "./components/Register";
import AddService from "./components/Add Service";
import Dashboard from "./components/Dashboard";
import LoginEmpolyee from "./components/Employee";
import AllOrder from "./components/Employee/AllOrder";
import PendingOrder from "./components/Employee/PendingOrder";
import Team from "./components/Home/Team";
import Mainlogin from "./components/Mainlogin";
import Contact from "./components/Employee/Contact";
// import { Mailer } from "nodemailer-react";

export const MyContext = createContext();
function App() {
  const navigate = useNavigate()
  const [isloggedin, setisloggedin] = useState(false);
  const [token, settoken] = useState("");
  const [logemployee, setlogemployee] = useState(false)
  const [order, setorder] = useState([])
  const [statelogin, setstatelogin] = useState("")// to  indentify if user login or employee
  const [userinfo, setuserinfo] = useState("")
  const state = { isloggedin, setisloggedin, token, settoken, setlogemployee, logemployee, order, setorder, statelogin, setstatelogin, userinfo, setuserinfo }
  const savetoken = (token, statelogin) => {
    settoken(token);
    if (statelogin === "user") {
      return setisloggedin(true)
    }
    if (statelogin === "employee") {
      return setlogemployee(true)
    }

  }
  useEffect(() => {
    settoken(localStorage.getItem("token"));
    setstatelogin(localStorage.getItem("statelogin"))
    if (token) {

      savetoken(token, statelogin)
    }
    if (isloggedin) { return navigate("/home") }
    if (logemployee) { return navigate("/dashemployee") }
  }, [token, isloggedin, logemployee])

  return (
    <>
      <MyContext.Provider value={state}>

        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/signin" element={<Mainlogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginemployee" element={<LoginEmpolyee />} />
            <Route path="/sendemail" element={<Contact />} />

            <>{
              isloggedin ? <>
     <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addservice"  element={<AddService />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}

              </>
                : ""}
            </>
            <>
              {
                logemployee ? <>
                  <Route path="/dashemployee" element={<AllOrder />} />
                  <Route path="/state order" element={<PendingOrder />} />
                </> : ""
              }


            </>


          </Routes>

        </div>


      </MyContext.Provider>
      ;
    </>
  );
}

export default App;
