import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
import "./style.css";
import { BsPersonCircle,BsFillEnvelopeFill,BsLightbulbFill,BsLightbulbOffFill} from 'react-icons/bs'
import {ImClock} from 'react-icons/im'
const Navigation = () => {
  const { isloggedin,token ,settoken,logemployee, setisloggedin, setlogemployee,setstatelogin } = useContext(MyContext)
  const navigate = useNavigate()
  return (
    <>
      <div className="header2">
        <div><img src="https://res.cloudinary.com/dzmmijyxh/image/upload/v1664991337/my%20image/ddd_njduiy.png"></img></div>
        <div className="linkhome">
        {!token?<>
          <Link to="/home"> Home</Link> 
         <Link to="/"> Services </Link> 
       <Link to="/team"> Our Team </Link>
      <Link to="/signin"> login <BsPersonCircle/></Link> </>:""}
         
{ isloggedin?  <> <Link to="/home"> Home</Link>  <Link to="/addservice"> Booking Service </Link>
<Link to="/dashboard"> My Dashboard</Link> 
<div className="dash">  <Link to="/"> My profile</Link> <div className="logout" onClick={() => {
    navigate("/signin"); localStorage.removeItem("token"); localStorage.removeItem("statelogin"); setisloggedin(false);settoken("");setstatelogin("")
  }}>log out </div></div> </>  :""
}

  { logemployee?<div className="dash"><div> <Link to="/dashemployee"> My Dashboard</Link></div> <div className="logout" onClick={() => {
    navigate("/signin"); localStorage.removeItem("token"); localStorage.removeItem("state");  localStorage.removeItem("statelogin"); setlogemployee(false);settoken("")
  }}>log out </div> </div> :  "" }
        </div>
      </div>
       {logemployee?"":<div className="header">
        <div className="icon-left">
         <span><ImClock/> 24/24 Sunday-Thursday</span> 
        
        </div>
        <div className="icon-right">
         <span> <BsFillEnvelopeFill/>lahlobahservices@gmail.com</span>
         {/* <span><BsLightbulbFill/></span>
       <span><BsLightbulbOffFill/></span> */}
        </div>
      </div>}

    </>
   
  )


}
export default Navigation