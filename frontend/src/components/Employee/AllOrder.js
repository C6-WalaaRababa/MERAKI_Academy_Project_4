import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./style.css"
import { useState } from 'react'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'

// let testAccount = nodemailer.createTestAccount();
// let transpoter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//         auth: {
//           user: process.env.USER, // email
//           pass: process.env.PASSWORD, //password
//         },
//       });

// async function main() {
  
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transpoter = nodemailer.createTransport({
//     host: "smtp-mail@outlook.email",
//     port: 587,
//     secure: false, 
//     auth: {
//       user: process.env.USER, // email
//       pass: process.env.PASSWORD, //password
//     },
//   });
    
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: `lahlopa app 🛍️ <${process.env.USER}>`,
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html:`<div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
//         <div style="max-width: 700px; background-color: white; margin: 0 auto">
//           <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
        
//           </div>
//           <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
//             <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
//               Form Shoeshop Store
//             </p>
//             <div style="font-size: .8rem; margin: 0 30px">
//              <p> hello heloo
//              <p>
//             </div>
//           </div>
//         </div>
//       </div>
//         `,
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }


const AllOrder = () => {
    const [Backmessage, setBackmessage] = useState("")
    const [Date, setDate] = useState()
    const { token, order, setorder,logempolyee ,setuserinfo} = useContext(MyContext)
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
const sendemail=async(id,email,firstName)=>
{
    const updateservice={statuseofService:"approved",Date:Date}
  
    try {
        const result = await (axios.put(`http://localhost:5000/service/${id}/update`,updateservice ,{
            headers: { authorization: "Bearer " + token }
        }))
       
        if (result.data.success) {
{/* <Sendmail email={email} firstName={firstName} Date={Date}/> */}
            const neworder=order.map((element) => {
            if (element._id===id)
           {
            element.statuseofService="approved";
            element.Date=Date;
           }
           return(element)
        })
        setorder(neworder)

    }
        else { throw Error }
    }
    catch (error) {
        {
            console.log(error)
            // setBackmessage(error.response.data.message)
        }

    }  
}



    useEffect(() => {
        { 
            myorder() }

    }, [])


    return (
        <>
        
            <div>All Order</div>
          <Link to="/state order">My state Order</Link>
          {
                order && order.map((element, i) => {
                    return (
                   <table>
                        <tr> <th># number of order</th> <th> customer Name</th> <th>customer Address</th> <th> Name of Service </th> <th> Discrption </th> <th> status of service</th> <th> Date</th>
                   <th> confirme service</th></tr>
                        <tr><td>{i}</td><td>{element.customer.firstName}</td> <td>{element.customer.email}</td>
                            <td>{element.title}</td><td>{element.description}</td> <td> {element.statuseofService}</td>
                            <td>{element.Date ?element.Date:<div><input type="date" onChange={(e)=>{setDate(e.target.value)}} ></input></div>}</td>
                           <td>{element.statuseofService=="approved"?"confirmed":<button onClick={()=> sendemail(element._id,element.customer.email,element.customer.firstName)}> Send  Confirmation</button>}</td>
                        </tr>
                            </table>)
                })

            }
       
            <div>{Backmessage ? <p>{Backmessage}</p> : ""}</div>
        </>
    )
}

export default AllOrder