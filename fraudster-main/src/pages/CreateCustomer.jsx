import React, { useRef } from 'react'
import {useAuth} from "../utils/UseAuth.jsx";
import Navbar from "../components/Navbar.jsx";
import {ID} from "appwrite";
import {createCustomer, getUser} from "../utils/UserActions.js";
import {createSettings} from "../utils/SettingsActions.js";
import NavMan from "../components/NavMan.jsx";

const CreateCustomer = () => {
    const {user, registerUser} = useAuth()

    const registerForm = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = registerForm.current.email.value
        const password = registerForm.current.password.value
        const name = registerForm.current.name.value
        const card_number = registerForm.current.card_number.value
        const manager_id = user.$id;
        const customer_id = ID.unique();
        const { bank_id } = await getUser(manager_id);


        const userInfo = {customer_id, email, password, name, manager_id, card_number, bank_id}

        registerUser(userInfo)
        createCustomer(userInfo)
        createSettings(customer_id)
    }

    return (
        <>
            <Navbar className="navbar" />
            <NavMan selected="create-customer"/>
            <div className="page">
                <form onSubmit={handleSubmit} ref={registerForm} className={"reguser-form"}>
                    <div className={"login-fields"}>
                        <label>Email:</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Customer email..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Password:</label>
                        <input
                            required
                            type="text"
                            name="password"
                            placeholder="Customer password..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Name:</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Customer name..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Card Number:</label>
                        <input
                            required
                            type="text"
                            name="card_number"
                            placeholder="Card number..."
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

export default CreateCustomer;