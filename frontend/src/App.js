import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { createContext, useState } from "react";
import Navigation from "./components/navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
export const MyContext = createContext();

function App() {
  const [isloggedin, setisloggedin] = useState(false);
  const [token, settoken] = useState("");
  const state={isloggedin,setisloggedin,token,settoken}
  return (
    <>
      <MyContext.Provider value={state}>  
       
        <div className="App">
          <h1> hello</h1>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>

        </div>
     
   
      </MyContext.Provider>
      ;
    </>
  );
}

export default App;
