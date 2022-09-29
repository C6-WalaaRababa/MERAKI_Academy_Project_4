import React, { useContext,useEffect } from 'react'
import axios from "axios"

import { useState } from 'react'
import { MyContext } from '../../App'
const AllOrder = () => {
    const [order, setorder] = useState([])
const [Backmessage, setBackmessage] = useState("")
const {token}=useContext(MyContext)

    const myorder=async()=>
    {
    try {
        const result = await (axios.get(`http://localhost:5000/service/employee`, {
            headers: { authorization: "Bearer " + token }
        }))
// console.log(result.data)
        if (result.data.success) {
          setorder([...order,...result.data.Orders])
            setBackmessage("")
        }
        else { throw Error }
    }
    catch (error) {
        if (!result.data.success) {
            return setBackmessage(error.response.data.message)
        }

    }
}

useEffect(() => {
    if(order.length)
    { myorder()}
  
}, [])


  return (
    <>
    <div>All Order</div>
    {
        order && order.map((element,i)=>
        {
return(<div>
    <tr> <th># number of order</th> <th> customer Name</th> <th>customer Address</th> <th> Name of Service </th> <th> Discrption </th> <th>Action</th></tr>
<tr><td>{i}</td> <td>{element.customer}</td> <td>{element.customer}</td>
<td>{element.title}</td><td>{element.description}</td> <td> {element.statuseofService}</td></tr>
</div>)
        })
    
    }
    <button onClick={myorder}>show</button>
    <div>{Backmessage?<p>{Backmessage}</p>:""}</div>
</>
  )
}

export default AllOrder