import React from 'react'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { MyContext } from '../../App'

const Myservice = () => {
    const [myorders, setmyorders] = useState([])
    const { token } = useContext(MyContext)
    const [Backmessage, setBackmessage] = useState("")
    const getmyorder = async () => {
        try {
            const response = await (axios.get(`http://localhost:5000/service/myservice`, {
                headers: { authorization: "Bearer " + token }
            }))
            if (response.data.success) {
                setmyorders(response.data.Orders)
            }
            else { throw Error }
        }
        catch (error) {

            {
                return setBackmessage(error.response.data.message)
            }

        }
    }

    useEffect(() => {
        getmyorder()
    }, [])



    return (
        <>
            <div> My Orderes</div>
            {myorders && myorders.map((element, i) => {
                return (
                    <div>
                        <h1>{element.title}</h1>
                        <h2>{element.description}</h2>
                        {/* <h3> {element.worker.firstName}</h3> */}
                        <p>{element.statuseofService}</p>

                    </div>
                )
            })

            }
        </>
    )
}

export default Myservice