import React, {useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../utils/UseAuth.jsx";


const Login = () => {
    const {user, loginUser, userRole} = useAuth()
    const navigate = useNavigate()

    const loginForm = useRef(null)

    useEffect(  () => {
        if (user) {
            if (userRole === 'customer') {
                navigate('/transaction-list')
            } else if (userRole === 'manager') {
                navigate('/create-customer')
            } else if (userRole === 'bank') {
                navigate('/merchant-list')
            }
        }
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = loginForm.current.email.value
        const password = loginForm.current.password.value

        const userInfo = {email, password}

        loginUser(userInfo)
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} ref={loginForm} className={"login-form"}>
                <div className={"login-fields"}>
                    <label>Email:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                    />
                </div>
                <div className={"login-fields"}>
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                    />
                </div>
                <div className={"login-fields"}>
                    <input
                        type="submit"
                        value="Login"
                        className="login-button"
                    />
                </div>
            </form>
        </div>
    )
}

export default Login;