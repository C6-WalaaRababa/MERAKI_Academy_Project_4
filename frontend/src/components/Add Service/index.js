import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { MyContext } from '../../App'
import axios from 'axios'
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
        // return setBackMessage1("Error happened while sending your order,plz try again");
        console.log(error)
      }
    }






  }

  useEffect(() => {
    if (selected) {
      handel(selected)
    }

  }, [selected])


  return (
    <>
      <div>AddService</div>
      {
        isloggedin ? <div>
          <input
            type="text"
            placeholder="Write Name of Service"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Write discription about what you need"
            onChange={(e) => {
              setDescriotion(e.target.value);
            }}
          ></input>
          <form>

            <label for="section"> choose section</label>
            <select name="section" id="category" value={selected} onChange={(e) => { setselected(e.target.value) }}>
              <option value="">choose your section </option>
              <option value="63319b04898c0203cb0bce6d">carpentry</option>
              <option value="63319b1b898c0203cb0bce6f">electricity</option>
              <option value="63319b2c898c0203cb0bce71">plumbing</option>
              <option value="63319b3a898c0203cb0bce73">painting</option>
              {/* <input type="submit" value="Submit" />  */}

            </select>

          </form>

          {/* <button onClick={(e)=>{e.preventDefault();
        handel("63319b04898c0203cb0bce6d")}}>carpentry </button>
      <button onClick={(e)=>{e.preventDefault();handel("63319b1b898c0203cb0bce6f")}}> electricity</button>
      <button onClick={(e)=>{e.preventDefault();handel("63319b2c898c0203cb0bce71")}}> plumbing</button>
      <button onClick={(e)=>{e.preventDefault();handel("63319b3a898c0203cb0bce73")}}> painting</button>

     { <button onClick={ handel}> submit </button>} */}
          {
            Employee && selected && Employee.map((worker, i) => {
              return (
                <>
                  <div>
                    <h3>{worker.firstName}</h3>
                    <div> {<h4> {worker.lastName}</h4> && <button onClick={() => setidemployee(worker._id)}>choose</button>} </div>
                  </div></>)
            })
          }
          <button onClick={submitOrder}> submit order </button>
          <div> {status1?<div>{BackMessage1}</div> :<div> {BackMessage1}</div> }</div>
        </div>
          : ""}
    </>
  )
}

export default AddService