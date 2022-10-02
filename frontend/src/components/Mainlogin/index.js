import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import slide from './silde.png'

const Mainlogin = () => {
    return (
        <>
        <div className='center'>
            <div className='center-form'>
                <div className='main'>
                    <h1> Welcome to lahlobah App </h1>
                    <h2> Home Maintanence Service </h2>
                    <div className='link'>
                        <div> <Link to="/login"> Login </Link> </div>
                        <div><Link to="/loginemployee" > Login Empolyee</Link></div>
                    </div>
                    <div> if already don't have an account ,<Link to="/register"> Sign up </Link>  here </div>
                </div>
            </div>
            <img src={slide}></img>
        </div>
        <div className='footer'>
<span> All rights </span>
        </div>
        </>
    )
}

export default Mainlogin