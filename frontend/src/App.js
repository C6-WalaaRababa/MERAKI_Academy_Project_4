import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { createContext, useState ,useEffect} from "react";
import Navigation from "./components/navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddService from "./components/Add Service";
import Myservice from "./components/Dashboard/Myservice";
import LoginEmpolyee from "./components/Employee";
import DashboardeEmployee from "./components/Employee/DashboardeEmpo";
export const MyContext = createContext();

function App() {
const navigate=useNavigate()
  const [isloggedin, setisloggedin] = useState(false);
  const [token, settoken] = useState("");
 const [logemployee, setlogemployee] = useState(false)
  const state={isloggedin,setisloggedin,token,settoken}
  useEffect(() => {
    settoken(localStorage.getItem("token"));
    if (token) {
      settoken(token)
      setisloggedin(true)
    }
    if (isloggedin && !logemployee) {
     navigate("/home");
    }
    
  }, [token, isloggedin]);

  return (
    <>
      <MyContext.Provider value={state}>  
       
        <div className="App">
          <h1> hello</h1>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/loginemployee" element={<LoginEmpolyee/>}/>
            <Route path="/dashemployee" element={<DashboardeEmployee/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/myservice" element={<Myservice/>}/>
            <Route path="/addservice" element={<AddService/>}/>
          </Routes>

        </div>
     
   
      </MyContext.Provider>
      ;
    </>
  );
}

export default App;
