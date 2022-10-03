import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./style.css"
import { useState } from 'react'
import { MyContext } from '../../App'
import {BsCheckLg,BsXLg} from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
const AllOrder = () => {
    const [Backmessage, setBackmessage] = useState("")
    const { token, order, setorder,logempolyee } = useContext(MyContext)
const navigate=useNavigate()
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
                // console.log(error.response)
                setBackmessage(error.response.data.message)
            }

        }
    }
const sendemail=(e)=>
{
    e.preventDefault();
        navigate("/sendemail")
}
    useEffect(() => {
        { myorder() }

    }, [logempolyee])


    return (
        <>
        
            <div>All Order</div>
          <Link to="/state order">My state Order</Link>
            {
                order && order.map((element, i) => {
                    return (
                   <table>
                        <tr> <th># number of order</th> <th> customer Name</th> <th>customer Address</th> <th> Name of Service </th> <th> Discrption </th> <th> status of service</th>
                        <th>action</th> <th> Send Email</th> </tr>
                        <tr><td>{i}</td> <td>{element.customer.firstName}</td> <td>{element.customer.email}</td>
                            <td>{element.title}</td><td>{element.description}</td> <td> {element.statuseofService}</td>
                            <td> <BsCheckLg onClick={console.log("adhik")}/> <BsXLg/></td> <td><button onClick={(e)=>sendemail(e)}> Send  Confirmation</button></td></tr>
                            </table>)
                })

            }
       
            <div>{Backmessage ? <p>{Backmessage}</p> : ""}</div>
        </>
    )
}

export default AllOrder