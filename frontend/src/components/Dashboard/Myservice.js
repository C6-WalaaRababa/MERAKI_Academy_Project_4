import React from 'react'
import axios from 'axios'
import { useEffect,useContext,useState } from 'react'
import { MyContext } from '../../App'

const Myservice = () => {
    const [myorders, setmyorders] = useState([])
    const { token } = useContext(MyContext)
    const getmyorder = async () => {
        try {
            const response = await (axios.get(`http://localhost:5000/service/myservice`, {
                headers: { authorization: "Bearer " + token }
            }))
            if (response.data.success) {
                setmyorders([myorders,...response.data.Orders])
                // setBackmessage("")
            }
            else { throw Error }
        }
        catch (error) {

            if (!response.data.success) {
                console.log(error.response.data.message)
                // return setBackmessage(error.response.data.message)
            }
            // setBackmessage(`there is an error in loading my Order`)

        }
    }
   
    useEffect(() => {
    getmyorder()

    }, [])
    


  return (
    <>
    <div> My Orderes</div>
    {myorders && myorders.map((element,i)=>
    {
        return(
            <div key={myordes.i}>
                <h1>{element.title}</h1>
                <h2>{element.description}</h2>
                <h1>{element.section.title}</h1>

            </div>
        )
    })
        
    }
    </>
  )
}

export default Myservice