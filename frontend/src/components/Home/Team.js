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
            const res = await (axios.get(`http://localhost:5000/employee`, {
                headers: { authorization: "Bearer " + token }
            }))

            if (res.data.success) {
                setemployee([employee, ...res.data.employees])
                setBackmessage("")
            }
            else { throw Error }
        }
        catch (error) {
            if (!res.data.success) { return setBackmessage(error.response.data.message) }

            setBackmessage(`there is an error in loading employee `)

        }
    }
    useEffect(() => {
    getemployee()
    }, [])
    
  return (
    <>
    <div>Our Team</div>
  
    {
                    employee ? employee.map((worker, i) => {
                        return (
                            <div>
                                <div> {worker.firstName} , {worker.lastName}</div>
                            </div>
                        )
                    })
                        : ""}
    </>
  )
}

export default Team