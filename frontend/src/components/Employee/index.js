import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import {  useNavigate} from 'react-router-dom'
import { MyContext } from '../../App'
const LoginEmpolyee = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [BackMessage, setBackMessage] = useState("")
    const navigate=useNavigate();
    const {  settoken, logemployee, setlogemployee } = useContext(MyContext)
    const signin = async () => {
        const workerInfo = { email, password }
        try {
            const result = await axios.post(`http://localhost:5000/employee/login`, workerInfo)
            if (result.data.success) {
                setlogemployee (true)
                localStorage.setItem("token", result.data.token)
                settoken(result.data.token);
            }
            else {
                throw Error
            }
        }
        catch (error) {
            if (error.response && error.response.data) {
                // console.log(error.response.data.message)
                return setBackMessage(error.response.data.message);
            }

        }
    }
    useEffect(() => {

        if (logemployee) {
            navigate("/dashemployee");
        }
    }, [logemployee]);






{/* <div>
                    <div><Link to="/state order">My state Order  </Link></div>
                    <div><Link to="/all order">My all order  </Link></div>
                    <div><Link to="/my profile">My profile  </Link> </div>
                    <div> <Link to="/log out">log out  </Link> </div>
                </div> */}


    return (
        <>
            <div>index</div>

            {
                !logemployee ? <div>
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
                    <button onClick={signin}> log in </button>
                </div> : ""
            }
            <div> {BackMessage ? <h2> {BackMessage}</h2>:""}</div>

        </>

    )
}

export default LoginEmpolyee