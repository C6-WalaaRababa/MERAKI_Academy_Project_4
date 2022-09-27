import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { MyContext } from "../../App"
import Team from "./Team"
const Home = () => {
    const [section, setsection] = useState([])
    const [Backmessage, setBackmessage] = useState("")
    const { token } = useContext(MyContext)
    const getsection = async () => {
        try {
            const res = await (axios.get(`http://localhost:5000/section`, {
                headers: { authorization: "Bearer " + token }
            }))

            if (res.data.success) {
                setsection([section, ...res.data.section])
                setBackmessage("")
            }
            else { throw Error }
        }
        catch (error) {
            if (!res.data.success) {
                return setBackmessage(error.response.data.message)
            }
            setBackmessage(`there is an error in loading section `)

        }
    }
   
    useEffect(() => {
        getsection()
    }, [])


    return (
        <>
            <div> Main Home Pape</div>
            <div> silder</div>
                {
                    // show categoy in app 
                    section ? section.map((element, i) => {
                        return (
                            <div key={section.id}>
                                <div> {element.title}</div>
                            </div>
                        )
                    }) : ""}
                <Team/>
                <div> {Backmessage}</div>
            
        </>
    )



}
export default Home;