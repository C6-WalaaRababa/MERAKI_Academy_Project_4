import React from 'react'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { MyContext } from '../../App'
import "./style.css";
const Dashboard = () => {
    const [myorders, setmyorders] = useState([])
    const [done, setdone] = useState()
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
            
                const newservice = myorders.forEach((element) => {
                    if (element._id === id) {
                        element.comment = comment;
                    }
                    return (element)
                })
                setmyorders([...myorders,...newservice])

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
    useEffect(() => {
        getmyorder()
    }, [])


    return (
        <>
            <div> My Orderes</div>
            {myorders && myorders.map((element, i) => {
                return (
                    <>
                        <div>
                            <h1>{element.title}</h1>
                            <h2>{element.description}</h2>
                            <p>section:{element.section.title}</p>
                            <h2>{element.worker.firstName}</h2>
                            <div> <img src={element.worker.imgpath}></img>
                            </div>
                            <p>{element.statuseofService}</p>
                            <div> {element.statuseofService == "approved" ?
                                <div>
                                    {/* <label for="yes_no_radio">Does your service completed?</label> */}
                                    {/* <input type="radio" name="yes_no" onChange={(e) => setdone(true)} checked>Yes</input>
                                    <input type="radio" name="yes_no" onChange={(e) => setdone(false)}>No</input>
                                    <input type="text"
                                        placeholder='give us your feed back about service'></input> */}
                                       <input type="text"
                                        placeholder='give us your feed back about service' onChange={(e)=>{setcomment(e.target.value)}}></input>

                                    <button on onClick={() =>
                                        sendfeedback(element._id)}> send</button>
                                </div>

                                : ""}
                            </div>


                        </div>
                    </>
                )
            })

            }
        </>

    )
}
export default Dashboard