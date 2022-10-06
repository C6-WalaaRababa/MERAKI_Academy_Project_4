import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./style.css"
import { useState } from 'react'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const AllOrder = () => {
    const [Backmessage, setBackmessage] = useState("")
    const [Date, setDate] = useState()
    const { token, order, setorder, logempolyee, setuserinfo } = useContext(MyContext)
    const navigate = useNavigate()
    const myorder = async () => {
        try {
            const result = await (axios.get(`http://localhost:5000/service/employee`, {
                headers: { authorization: "Bearer " + token }
            }))

            if (result.data.success) {
                setorder(result.data.Orders)


            }
            else { throw Error }
        }
        catch (error) {
            {
                
                setBackmessage(error.response.data.message)
            }

        }
    }
    const sendemail = async (id, email, firstName) => {
        const updateservice = { statuseofService: "approved", Date: Date }

        try {
            const result = await (axios.put(`http://localhost:5000/service/${id}/update`, updateservice, {
                headers: { authorization: "Bearer " + token }
            }))

            if (result.data.success) {
                {/* <Sendmail email={email} firstName={firstName} Date={Date}/> */ }
                const neworder = order.map((element) => {
                    if (element._id === id) {
                        element.statuseofService = "approved";
                        element.Date = Date;
                    }
                    return (element)
                })
                setorder(neworder)
                const emailconfirmation = await axios.post(`http://localhost:5000/sendmail`, { email, firstName, Date })
                console.log(emailconfirmation.data)

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
        {
            myorder()
        }

    }, [])


    return (
        <>
<div className='container_tabel'></div>
            <h1>All Order</h1>
            <table>
                            <tr> <th># num of order</th> <th> Customer Name</th> <th>Customer Email</th> <th> Name of Service </th> <th> Description about </th> <th> Status of Service</th> <th> Date</th>
                                <th> Confirme Service</th></tr>
            {
                order && order.map((element, i) => {
                    return (
                      
                            <tr><td>{i}</td><td>{element.customer.firstName}</td> <td>{element.customer.email}</td>
                                <td>{element.title}</td><td>{element.description}</td> <td> {element.statuseofService}</td>
                                <td>{element.Date ? element.Date : <div><input type="date" onChange={(e) => { setDate(e.target.value) }} ></input></div>}</td>
                                <td>{element.statuseofService == "approved" ? "confirmed" : <button onClick={() => sendemail(element._id, element.customer.email, element.customer.firstName)}> Send  Confirmation</button>}</td>
                            </tr>
                      )
                })

            }
              </table>

            <div>{Backmessage ? <p>{Backmessage}</p> : ""}</div>
        </>
    )
}

export default AllOrder