import React from 'react'
import { useEffect,useContext ,useState} from 'react'
import axios from "axios"
import { MyContext } from '../../App'
const Team = () => {
const {token}=useContext(MyContext)
const [employee, setemployee] = useState([])
const [Backmessage, setBackmessage] = useState("")
    const getemployee = async () => {
        try {
            const res = await (axios.get(`http://localhost:5000/employee/ourteam`))
            if (res.data.success) {
                setemployee(res.data.employees)
            }
            else { throw Error }
        }
        catch (error) {
          { return setBackmessage(error.response.data.message) }

        }
    }
    useEffect(() => {
    getemployee()
    }, [])
    
  return (
    <>
    <h1> Our Team</h1>
  
    {
                    employee ? employee.map((worker, i) => {
                        return (
                            <div>
                                <div> {worker.firstName} , {worker.rate}</div>
                            </div>
                        )
                    })
                        : ""}
    </>
  )
}

export default Team