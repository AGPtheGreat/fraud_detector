import React, {useRef} from "react";
import {createTransaction} from "../utils/TransactionActions.js";
import {checkSettings, getSettings} from "../utils/SettingsActions.js";
import {getID} from "../utils/UserActions.js";
import {getMerchant, updateMerchantTotals} from "../utils/MerchantActions.js";

function CreateTransaction() {
    const transactionForm = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const card_number = transactionForm.current.cardNumber.value
        const transaction_timestamp = new Date()
        const transaction_amount = parseFloat(transactionForm.current.transactionAmount.value)
        const merchant_id = transactionForm.current.merchantId.value
        updateMerchantTotals(merchant_id, 'increaseTotal')
        const online = transactionForm.current.online.checked
        const { customer_id, manager_id } = await getID(card_number)

        let transaction_status = ''
        let fraud_score = 0
        let transaction_currency = 'usd'

        const {name, location, category} = await getMerchant(merchant_id)
        const merchant_name = name;
        const transaction_location = location;
        const transaction_type = category;

        const is_fraud = false;

        let transaction = {customer_id, card_number, transaction_timestamp, transaction_amount, transaction_currency, transaction_type, transaction_status, merchant_id, merchant_name, transaction_location, fraud_score, online, is_fraud, manager_id}
        transaction_status = await checkSettings(transaction, await getSettings(transaction.customer_id))
        transaction = {customer_id, card_number, transaction_timestamp, transaction_amount, transaction_currency, transaction_type, transaction_status, merchant_id, merchant_name, transaction_location, fraud_score, online, is_fraud, manager_id}

        await createTransaction(transaction)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={transactionForm}>

                <div>
                    <label>Card Number:</label>
                    <input
                        required
                        type="text"
                        name="cardNumber"
                    />
                </div>

                <div>
                    <label>Transaction Amount:</label>
                    <input
                        required
                        type="number"
                        name="transactionAmount"
                        step="0.01"
                    />
                </div>

                <div>
                    <label>Merchant ID:</label>
                    <input
                        type="text"
                        name="merchantId"
                    />
                </div>

                <div>
                    <label>Online:</label>
                    <input
                        type="checkbox"
                        name="online"
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Submit"
                        className="login-button"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateTransaction;