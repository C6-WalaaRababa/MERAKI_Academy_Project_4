import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";

const Navigation = () => {
    const { isloggedin, token,logemployee } = useContext(MyContext)
    return (
        <>
            <div>
               
               {
                !isloggedin && !token ?<div>
                    <div> <Link to="/login"> login </Link> </div>
               <div> <Link to="/register"> register </Link> </div>
                <div><Link to="/loginemployee" > Login Empolyee</Link></div>
                </div>:
                    !logemployee? <div> <div><Link to="/home"> Home </Link> </div>
                  <div> <Link to="/">Category </Link> </div>
                   <div> <Link to="/dashboard">  MY dashboard </Link> </div>
                   <div> <Link to="/">  log out </Link> </div>
                     <div> <Link to="/addservice">AddService</Link></div> 
                    </div> :<div>
                    <div> <Link to="/dashemployee"> My Dashboard </Link> </div> 
                 <div><Link to="/state order">My state Order  </Link></div>
                    <div><Link to="/all order">My all order  </Link></div>
                    <div><Link to="/my profile">My profile  </Link> </div>
                    </div>
                
               }

               


                   
                
                   
                   
                


                </div>

        </>
    )


}
export default Navigation