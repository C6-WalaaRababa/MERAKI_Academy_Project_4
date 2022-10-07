import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { MyContext } from "../../App"
import Team from "./Team"
import "./style.css"
 import {BsWrench,BsHammer} from "react-icons/bs";import {GiChainsaw} from 'react-icons/gi'
 import {TbLamp2} from 'react-icons/tb'
import {MdPlumbing} from 'react-icons/md'
import {GrHostMaintenance} from 'react-icons/gr'
import {FaPaintRoller} from 'react-icons/fa'
const Home = () => {
    const [department, setdepatment] = useState([])
    const [Backmessage, setBackmessage] = useState("")
    const { token } = useContext(MyContext)
    const getsection = async () => {
        try {
            const res = await (axios.get(`http://localhost:5000/section`))
            if (res.data.success) {
               setdepatment(res.data.section)
            }
            else { throw Error }
        }
        catch (error) {
             setBackmessage(error.response.data.message)
        }
    }

    useEffect(() => {
        getsection()
    }, [])


    return (
        <>

            <div className="center-top">
                <div className="part1">
                    <h3> we will take care of Maintanence needs</h3>
                    <h1> We Provide the Best Home Maintanence Services</h1>
                </div>
            </div>
           
                <h1> Our Services </h1>
                <span> </span>
                <div className="center-center">
                    {/* <BsWrench/>
                    <BsHammer/>
                    <AiFillDashboard/>
                     <FaPaintRoller/> */}
                    {
                       department && department.map((element, i) => {
                            return (
                                <div className="item">{element.title}</div>
                            )
                        })}
                </div>
               
            {/* <Team /> */}
            <h5> {Backmessage}</h5>
        </>
    )



}
export default Home;