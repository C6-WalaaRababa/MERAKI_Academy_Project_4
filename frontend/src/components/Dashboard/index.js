import { Link } from "react-router-dom"
const Dashboard=()=>
{

    return (
        <>
        <div> MY dashboard</div>
        <div><Link to="/addservice">Booking Order</Link> </div>
        <div><Link to="/myservice">MY list orders</Link></div>
        <div> <Link to="/">MY list orders</Link></div>

        </>

    )
}
export default Dashboard