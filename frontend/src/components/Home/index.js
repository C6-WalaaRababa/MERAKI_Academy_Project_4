import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { MyContext } from "../../App"
import "./style.css"
import { useNavigate } from "react-router-dom"
import Footerpart from "../Foater"

const Home = () => {
    const navigate = useNavigate()
const {isloggedin}=useContext(MyContext)
const handel=()=>
{
    navigate("/about")
}

    return (
        <>

            <div className="center-top">
                <div className="part1">
                    <h3> we will take care of Maintanence needs</h3>
                    <h1> We Provide the Best Home Maintanence Services</h1>
                    {/* <div> <button className="button" onClick={!isloggedin? navigate("/login"):navigate("/addservice")}> Book Now Service</button></div> */}
                </div> 
            </div>
        
               
                <div className="My_Dashboard" >
                    <div className="login_form">
                    <h1>About us</h1>
        <h5>
        An application that provides a range of home maintenance services such as painting, carpentry, electricity and plumbing, by an integrated team of women specialized in these fields.
       
The application was created due to the need for the presence of women who provide maintenance services, especially to take into account the conditions of customers, such as working women or single mothers who cannot find a maintenance service employee easily, now with the application they only have to create a maintenance service request in seconds and the employee who was chosen based on the customer’s opinion will contact you via email.
</h5>
<div className="show">{isloggedin?"":<button className="button" onClick={(e)=>handel()}> Show more </button>}</div>
</div>
<div className="img_manger"><img src='https://res.cloudinary.com/dzmmijyxh/image/upload/v1665001285/my%20image/pexels-edmond-dant%C3%A8s-4342352_qr6peg.jpg'></img><h1> Ali Asaad(EX Manger) </h1></div>
</div>
<Footerpart/>
        </>
    )



}
export default Home;