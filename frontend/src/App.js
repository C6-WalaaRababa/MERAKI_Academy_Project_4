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
export const MyContext = createContext();

function App() {
  const navigate = useNavigate()
  const [isloggedin, setisloggedin] = useState(false);
  const [token, settoken] = useState("");
  const [logemployee, setlogemployee] = useState(false)
  const [order, setorder] = useState([])
  const state = { isloggedin, setisloggedin, token, settoken, setlogemployee, logemployee, order,setorder}
  useEffect(() => {
    settoken(localStorage.getItem("token"));
    if (token) {
      // check token is for user or employee by using req on backen , depend on result >> log in for user or employee 
      settoken(token)
      setisloggedin(true)
    }
    if (isloggedin && !logemployee) {
      navigate("/home");
    }
    if (logemployee)
      navigate("/dashemployee")
  }, [token, isloggedin]);

  return (
    <>
      <MyContext.Provider value={state}>

        <div className="App">
          <h1> hello</h1>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/loginemployee" element={<LoginEmpolyee />} />
            <Route path="/dashemployee" element={<DashboardeEmployee />} />
            <Route path="/all order" element={<AllOrder />} />
            <Route path="/state order" element={<PendingOrder/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myservice" element={<Myservice />} />
            <Route path="/addservice" element={<AddService />} />
          </Routes>

        </div>


      </MyContext.Provider>
      ;
    </>
  );
}

export default App;
