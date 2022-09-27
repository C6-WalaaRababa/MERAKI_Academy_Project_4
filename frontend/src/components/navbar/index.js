import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";

const Navigation = () => {
    const { isloggedin, token } = useContext(MyContext)
    return (
        <>
            <div>
               
                {!isloggedin && !token ? <div>
                    <div> <Link to="/login"> login </Link> </div>
                    <div> <Link to="/register"> register </Link> </div>
                    <div> <Link to="/"> Home </Link> </div></div> :   <div>
                    <div> <Link to="/"> dashboard </Link> </div>
                    <div> <Link to="/">section </Link> </div>
                    <div>  <Link to="/"> order Service </Link> </div>
                        </div>}
            </div>

        </>
    )


}
export default Navigation