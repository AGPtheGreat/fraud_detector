import React, { useRef } from 'react'
import {useAuth} from "../utils/UseAuth.jsx";
import Navbar from "../components/Navbar.jsx";
import {ID} from "appwrite";
import {createManager} from "../utils/UserActions.js";
import NavBank from "../components/NavBank.jsx";

const CreateManager = () => {
    const {user, registerUser} = useAuth()

    const registerForm = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = registerForm.current.email.value
        const password = registerForm.current.password.value
        const name = registerForm.current.name.value
        const manager_id = ID.unique();
        const bank_id = user.$id

        const userInfo = {email, password, name, manager_id, bank_id}

        registerUser(userInfo)
        createManager(userInfo)
    }

    return (
        <>
            <Navbar className="navbar" />
            <NavBank selected="create-manager"/>
            <div className="page">
                <form onSubmit={handleSubmit} ref={registerForm} className={"reguser-form"}>
                    <div className={"login-fields"}>
                        <label>Email:</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Manager email..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Password:</label>
                        <input
                            required
                            type="text"
                            name="password"
                            placeholder="Manager password..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Name:</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Manager name..."
                        />
                    </div>

                    <div className={"login-fields"}>
                        <input
                            type="submit"
                            className="submit"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateManager;