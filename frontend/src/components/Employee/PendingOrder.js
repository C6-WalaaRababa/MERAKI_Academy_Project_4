import React, { useContext,useState } from 'react'
import { MyContext } from '../../App'

const PendingOrder = () => {
    const {order}=useContext(MyContext)
    const [pendingorder, setpendingorder] = useState([])
const readpendingorder=async()=>
{
     const c=[];
   c=order.filter((e,i)=>
    {
        return e.statuseofServic==="pending"
    })
setpendingorder([...pendingorder,...c])
}
  return (
    <>
    <div>PendingOrder</div>
    {
        console.log(order)
    }
    </>
  )
}

export default PendingOrder