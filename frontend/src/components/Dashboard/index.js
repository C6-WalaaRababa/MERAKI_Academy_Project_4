import React from 'react'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import {GrFormClose} from 'react-icons/gr'
import { MyContext } from '../../App'
import "./style.css";
const Dashboard = () => {
    const [myorders, setmyorders] = useState([])
    const [comment, setcomment] = useState("")
    const { token } = useContext(MyContext)
    const [Backmessage, setBackmessage] = useState("")
    const {isloggedin}=useContext(MyContext)
    const getmyorder = async () => {
        try {
            const response = await (axios.get(`http://localhost:5000/service/myservice`, {
                headers: { authorization: "Bearer " + token }
            }))
            if (response.data.success) {
                setmyorders(response.data.Orders)
            }
            else { throw Error }
        }
        catch (error) {

            {
                setBackmessage(error.response.data.message)
            }

        }
    }

    const sendfeedback = async (id) => {
        const newdata = {
           comment}

        try {
            const response = await (axios.put(`http://localhost:5000/service/${id}/myservice/update`, newdata, {
                headers: { authorization: "Bearer " + token }
            }))
            if (response.data.success) {
                const newservice = myorders.map((element) => {
                    if (element._id == id) {
                        element.Comment = comment;
                    }
                    return (element)
                })
                
setmyorders(newservice)
            }
            else { throw Error }
        }
        catch (error) {
            console.log(error)
            {
                // setBackmessage(error.response.data.message)
            }

        }

    }
    const cancelmyorder = async (id) => {
        try {
            const response = await (axios.delete(`http://localhost:5000/service/myservice/${id}`, {
                headers: { authorization: "Bearer " + token }
            }))
            if (response.data.success) {
                
                const ordernewe=myorders.filter((e,i)=>
                {
                    return(e._id!==id)
                })
                setmyorders(ordernewe)
            }
            else { throw Error }
        }
        catch (error) {

            {
                setBackmessage(error.response.data.message)
            }

        }
    }
    useEffect(() => {
        getmyorder()
    }, [])


    return (
        <>
            
                <h1>My orders</h1>
                <div className="My_Dashboard"> 
            {myorders && myorders.map((element, i) => {
                return (
                    <>
                        <div className='service'>
                            <p> Title of Service:{element.title}</p>
                            <p> Description:{element.description}</p>
                            <p>Section: {element.section.title}</p>
                            <p> Name of worker :{element.worker.firstName}</p>
                            <div className='worker'><p> Image worker </p> <img src={element.worker.imgpath}></img>
                            </div>
                            <p> Statuse of Service : {element.statuseofService}</p>
                           <p>{element.Date ?<h4> The date is{element.Date}</h4> :<h4> The date has not yet been determined</h4>}</p>
                            <div className='feedback'> {!element.Comment && element.statuseofService==="approved"?
                                <div>

                                       <input type="text"
                                        placeholder='give us your feed back about service' onChange={(e)=>{setcomment(e.target.value)}}></input>

                                    <button on onClick={() =>
                                        sendfeedback(element._id)}> send</button>
                                </div>:''

                                }
                                {
                                    element.Comment?<p>your feedback was: {element.Comment}</p>:""
                                }
                            </div>
<button onClick={()=>{ cancelmyorder(element._id)}} className="cancel" > delete Order</button>

                        </div>
                    </>
                )
            })

            }
            </div>
        </>

    )
}
export default Dashboard