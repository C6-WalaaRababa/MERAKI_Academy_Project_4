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
            <div className='conatiner2'> 
                <h1>My orders</h1>
            {myorders && myorders.map((element, i) => {
                return (
                    <>
                        <div className='service'>
                            <p> Title of Service:{element.title}</p>
                            <p>Descriotion:{element.description}</p>
                            <p>Section: {element.section.title}</p>
                            <p> Name of worker :{element.worker.firstName}</p>
                            <div className='worker'> <img src={element.worker.imgpath}></img>
                            </div>
                            <p> Statuse of Service : {element.statuseofService}</p>
                           <p>{element.Date ?<h4> The date is{element.Date}</h4> :<h4> The date has not yet been determined</h4>}</p>
                            <div> {!element.Comment && element.statuseofService==="approved"?
                                <div>

                                       <input type="text" className='input'
                                        placeholder='give us your feed back about service' onChange={(e)=>{setcomment(e.target.value)}}></input>

                                    <button on onClick={() =>
                                        sendfeedback(element._id)}> send</button>
                                </div>:''

                                }
                                {
                                    element.Comment?<h2>your feed back is {element.Comment}</h2>:""
                                }
                            </div>
<button onClick={()=>{ cancelmyorder(element._id)}} className="cancel" > Cancel Order < GrFormClose/></button>

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