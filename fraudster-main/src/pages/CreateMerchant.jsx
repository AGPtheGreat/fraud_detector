import React, { useRef } from 'react'
import {useAuth} from "../utils/UseAuth.jsx";
import Navbar from "../components/Navbar.jsx";
import NavBank from "../components/NavBank.jsx";
import {createMerchant} from "../utils/MerchantActions.js";

const CreateMerchant = () => {
    const {user} = useAuth()

    const registerForm = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        const merchant_id = registerForm.current.merchant_id.value
        const name = registerForm.current.name.value
        const category = registerForm.current.category.value
        const location = registerForm.current.location.value
        const bank_id = user.$id
        const transaction_count = 0
        const fraud_count = 0

        const merchantInfo = {merchant_id, category, name, location, bank_id, transaction_count, fraud_count }
        createMerchant(merchantInfo)
    }

    return (
        <>
            <Navbar className="navbar" />
            <NavBank selected="create-manager"/>
            <div className="page">
                <form onSubmit={handleSubmit} ref={registerForm} className={"reguser-form"}>
                    <div className={"login-fields"}>
                        <label>ID:</label>
                        <input
                            required
                            type="text"
                            name="merchant_id"
                            placeholder="Merchant ID..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Name:</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Merchant name..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Category:</label>
                        <input
                            required
                            type="text"
                            name="category"
                            placeholder="Merchant category..."
                        />
                    </div>
                    <div className={"login-fields"}>
                        <label>Location:</label>
                        <input
                            required
                            type="text"
                            name="location"
                            placeholder="Merchant location..."
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

export default CreateMerchant;