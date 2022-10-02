import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { createContext, useState, useEffect } from "react";
import Navigation from "./components/navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddService from "./components/Add Service";
import Myservice from "./components/Dashboard/Myservice";
import LoginEmpolyee from "./components/Employee";
import DashboardeEmployee from "./components/Employee/DashboardeEmpo";
import AllOrder from "./components/Employee/AllOrder";
import PendingOrder from "./components/Employee/PendingOrder";
import MainPage from "./components/Mainlogin";
import Team from "./components/Home/Team";
import Mainlogin from "./components/Mainlogin";
export const MyContext = createContext();
// import pic from "./images/mypic.png";
function App() {
  const navigate = useNavigate()
  const [isloggedin, setisloggedin] = useState(false);
  const [token, settoken] = useState("");
  const [logemployee, setlogemployee] = useState(false)
  const [order, setorder] = useState([])
  const[statelogin,setstatelogin]=useState(false)// to  indentify if user login or employee
  const state = { isloggedin, setisloggedin, token, settoken, setlogemployee, logemployee, order, setorder }
  useEffect(() => {
    settoken(localStorage.getItem("token"));
    setstatelogin(localStorage.getItem("state"))
    if (token) {
      // check token is for user or employee by using req on backen , depend on result >> log in for user or employee 
      settoken(token)
      if(statelogin)
      {
      setisloggedin(true)}
      if(!statelogin)
      {
        setlogemployee(true)
      }

    }
    if (isloggedin) {
      navigate("/home");
    }
    if (logemployee)
      navigate("/dashemployee")
  }, [token, isloggedin]);

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

  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/myservice" element={<Myservice />} />
  <Route path="/addservice" element={<AddService />} />

            <Route path="/loginemployee" element={<LoginEmpolyee />} />
            <Route path="/dashemployee" element={<DashboardeEmployee />} />
            <Route path="/all order" element={<AllOrder />} />
            <Route path="/state order" element={<PendingOrder />} />


          </Routes>

        </div>


      </MyContext.Provider>
      ;
    </>
  );
}

export default App;
