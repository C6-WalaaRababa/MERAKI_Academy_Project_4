import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";
import "./style.css"
const Team = () => {
  const { token } = useContext(MyContext);
  const [employee, setemployee] = useState([]);
  const [Backmessage, setBackmessage] = useState("");
  const [search, setsearch] = useState("")
  
  const getemployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/ourteam`);
      if (res.data.success) {
        setemployee(res.data.employees);
      } else {
        throw Error;
      }
    } catch (error) {
      {
        setBackmessage(error.response.data.message);
      }
    }
  };
  const searchemployee= async()=>
  {
    
    try {
        const res = await axios.get(`http://localhost:5000/employee/search_2?search=${search}`);
        if (res.data.success) {
            // console.log(res.data.employees)
            setemployee(res.data.employees);
        //   const newEmployee=employee.filter((element,i)=>
        //   {
        //     return element.firstName==
        //   })  
      
         
        } else {
          throw Error;
        }
      } catch (error) {
        {
          setBackmessage(error.response.data.message);
        }
  }
}
  useEffect(() => {
    getemployee();
  }, []);

  return (
    <>
      <h1> Our Team</h1>
      <div>
     <input type="text" width="40" placeholder="search employee" onChange={(e)=>{setsearch(e.target.value)}}></input>
     <button onClick={searchemployee}> search </button>
     </div>
     <div className='employee-list'>
      {employee
        ? employee.map((worker, i) => {
            return (
              <>
                <div className="employee">
                  <div>
                    <img src={worker.imgpath}></img>
                  </div>
                  <h4>{worker.firstName}</h4>
                  <h5>{worker.rate}</h5>
                </div>
              </>
            );
          })
        : ""}
        </div>
    </>
  );
};

export default Team;
