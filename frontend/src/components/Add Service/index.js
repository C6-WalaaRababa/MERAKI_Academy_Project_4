import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { MyContext } from '../../App'
import axios from 'axios'
import "./style.css"
const AddService = () => {
  const [Title, setTitle] = useState("")
  const [Descriotion, setDescriotion] = useState("")
  const [Idsection, setIdsection] = useState("")
  const { token, isloggedin } = useContext(MyContext)
  const [BackMessage, setBackMessage] = useState("")
  const [status, setstatus] = useState(false)
  const [BackMessage1, setBackMessage1] = useState("")
  const [status1, setstatus1] = useState(false)
  const [Employee, setEmployee] = useState([])
  const [selected, setselected] = useState("")
  const [idemployee, setidemployee] = useState("")
  const handel = async (id) => {

    try {
      const result = await axios.get(`http://localhost:5000/employee/search_1/?namesection=${id}`, {
        headers: { authorization: "Bearer " + token }
      })

      if (result.data.success) {
        setEmployee(result.data.employees)
        // setBackMessage(result.data.message);
      } else {
        throw Error;
      }
    } catch (error) {
      setstatus(false)
      if (error.response && error.response.data) {
        return setBackMessage("Error happened while loading employee");
      }
    }
  };
  const submitOrder = async () => {
    try {
      const info={title:Title,
        description:Descriotion,section:selected,worker:idemployee}
      const result = await axios.post(`http://localhost:5000/service`,info, {
        headers: { authorization: "Bearer " + token }
      })

      if (result.data.success) {
        setstatus1(true)
        setBackMessage1(result.data.message);
      } else {
        throw Error;
      }
    } catch (error) {
      setstatus1(false)
      if (error.response && error.response.data) {
        return setBackMessage1("Error happened while sending your order,plz try again");
      }
    }






  }

  useEffect(() => {
    if (selected) {
      handel(selected)
    }

  }, [selected, idemployee])


  return (
    <>
      <div className='container'>
      <div className='login_form'>
        <h1>Booking Service</h1>
          <input className="input"
            type="text"
            placeholder="write title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <input className="input"
            type="text"
            placeholder="write discription about the problem"
            onChange={(e) => {
              setDescriotion(e.target.value);
            }}
          ></input>
          <div className="list">
            <div>
            <label for="section"> choose section</label>
            <select className='list_department' name="section" id="category" value={selected} onChange={(e) => { setselected(e.target.value) }}>
              <option value="">choose your section </option>
              <option value="63319b04898c0203cb0bce6d">carpentry</option>
              <option value="63319b1b898c0203cb0bce6f">electricity</option>
              <option value="63319b2c898c0203cb0bce71">plumbing</option>
              <option value="63319b3a898c0203cb0bce73">painting</option>
            </select>
            </div>
            
  <div className='employee-list'>
          {
            Employee && Employee.map((worker, i) => {
              return (
                <>
                
                  <div className='employee'>
                    <div><img src={worker.imgpath}></img></div>
                    <h4>{worker.firstName}</h4>
{/* <h5>{worker.rate}</h5> */}
                    <div>  <button  
                    onClick={(e) => {e.target.style.backgroundColor = "green";
              setidemployee(worker._id) }} className="choose">choose</button> </div>
                  </div></>)
            })
          }
         </div>
        
       </div>
          <button onClick={submitOrder} className="button"> submit order </button>
          <div> {status1?<div className='true'>{BackMessage1}</div> :<div className='false'> {BackMessage1}</div> }</div>

          </div>
          <div className='img_login'><img src='https://res.cloudinary.com/dzmmijyxh/image/upload/v1665176194/my%20image/Service_24_7-amico_xxwbuf.png'></img></div>
  
          </div> 
    </>
  )
}

export default AddService