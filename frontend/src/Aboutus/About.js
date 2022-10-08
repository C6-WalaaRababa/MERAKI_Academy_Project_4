import React from 'react'
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import {GrInfo} from 'react-icons/gr'
;import {GiChainsaw} from 'react-icons/gi'
import "./style.css"
 import {TbLamp2} from 'react-icons/tb'
import {MdPlumbing} from 'react-icons/md'
import {GrHostMaintenance} from 'react-icons/gr'
import {FaPaintRoller} from 'react-icons/fa'
export const About = () => {
  const [department, setdepatment] = useState([])
  const [Backmessage, setBackmessage] = useState("")
  const getsection = async () => {
      try {
          const res = await (axios.get(`http://localhost:5000/section`))
          if (res.data.success) {
             setdepatment(res.data.section)
          }
          else { throw Error }
      }
      catch (error) {
           setBackmessage(error.response.data.message)
      }
  }

  useEffect(() => {
      getsection()
  }, [])

  return (
    <>
        <div className='My_Dashboard'>
        <div className='login_form'>
          <h1> About us </h1>
        <h5>
        An application that provides a range of home maintenance services such as painting, carpentry, electricity and plumbing, by an integrated team of women specialized in these fields.
The application was created due to the need for the presence of women who provide maintenance services, especially to take into account the conditions of customers, such as working women or single mothers who cannot find a maintenance service employee easily, now with the application they only have to create a maintenance service request in seconds and the employee who was chosen based on the customer’s opinion will contact you via email.

 we have started seince 2022 ,We always strive to satisfy the customer and provide the best quality of services to him, and we are always looking forward to expanding the areas of service we provide and enlarging the family of our employees.
</h5>
</div>
<div className='img_manger'><img src='https://res.cloudinary.com/dzmmijyxh/image/upload/v1665001285/my%20image/pexels-edmond-dant%C3%A8s-4342352_qr6peg.jpg'></img></div>
  
</div>
<div  className="section">
<h2> Our Services </h2>
<h2> <GrHostMaintenance/></h2>
                <div className="My_Dashboard" >
               <div className='icon'>
               <GiChainsaw/>
                <TbLamp2/>
                    <MdPlumbing/>
                

                     <FaPaintRoller/>
                     </div>
                    {
                       department && department.map((element, i) => {
                            return (
                                <div className="item">{element.title}</div>
                            )
                        })}
                </div>
                </div>
              

    </>
  )
}
export default About
