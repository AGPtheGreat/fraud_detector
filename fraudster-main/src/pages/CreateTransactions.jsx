import React, {useRef} from "react";
import {createTransaction} from "../utils/TransactionActions.js";


function CreateTransactions() {
    const transactions = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        const transactionsArray = transactions.current.transactions.value.split('; ');

        transactionsArray.forEach(transaction => {
            const transactionArray = transaction.split(',     ')

            const customer_id = transactionArray[0];
            const card_number = transactionArray[1];
            const transaction_timestamp = transactionArray[2];
            const transaction_amount = parseFloat(transactionArray[3]);
            const transaction_currency = transactionArray[4];
            const transaction_type = transactionArray[5];
            const transaction_status = transactionArray[6];
            const merchant_id = transactionArray[7];
            const merchant_name = transactionArray[8];
            const transaction_location = transactionArray[9];
            const fraud_score = parseFloat(transactionArray[10]);

            const transactionDone = {
                customer_id,
                card_number,
                transaction_timestamp,
                transaction_amount,
                transaction_currency,
                transaction_type,
                transaction_status,
                merchant_id,
                merchant_name,
                transaction_location,
                fraud_score
            }

            createTransaction(transactionDone);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={transactions}>
                <div>
                    <label>Customer ID:</label>
                    <input
                        required
                        type="textarea"
                        name="transactions"
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

export default CreateTransactions;