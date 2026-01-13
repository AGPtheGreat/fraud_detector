import Navbar from "../components/Navbar.jsx";
import React, {useEffect, useState} from "react";
import NavMan from "../components/NavMan.jsx";
import {useAuth} from "../utils/UseAuth.jsx";
import {getFlaggedTransactions} from "../utils/TransactionActions.js";

const LOAD_AMOUNT = 20;

const FlaggedTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [popUp, setPopUp] = useState(null);
    const [index, setIndex] = useState(0);
    const [atEnd, setAtEnd] = useState(false);
    const {user} = useAuth()

    async function fetchData() {
        const data = await getFlaggedTransactions(user.$id, index, LOAD_AMOUNT);
        if(data.length < LOAD_AMOUNT) {
            setAtEnd(true);
        }
        setTransactions(transactions.concat(data));
        setIndex(index+LOAD_AMOUNT);
    }

    useEffect(() => {
        fetchData();
        console.log(transactions)
    }, [user]);

    const getRowColor = (transaction) => {
        if (transaction.transaction_status === 'declined') {
            return 'red-row';
        } else if (transaction.transaction_status === 'pending') {
            return 'orange-row';
        } else {
            return 'green-row';
        }
    };

    const openTransaction = (transaction) => {
        setPopUp(transaction);
    }

    const closeTransaction = () => {
        setPopUp(null);
    }

    return (
        <>
            <Navbar />
            <NavMan selected='flagged-transactions' />
            <div className="page">
                    {popUp &&
                        <div className={'popup-container'}>
                            <div className={`popup ${getRowColor(popUp)}`}>
                                <div className={'popup-header'}>
                                    <strong>{`ID: ${popUp.transaction_id}`}</strong>
                                    <div>
                                        <button onClick={closeTransaction}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                                <span>{`Card Number: ${popUp.card_number.replace(/[-\s]/g, '').match(/\d{1,4}/g)?.join('-')}`}</span>
                                <span>{`Date: ${new Date(popUp.transaction_timestamp).toString()}`}</span>
                                <span>{`Type: ${popUp.transaction_type}`}</span>
                                <span style={{color: 'green'}}>{popUp.transaction_amount > 0 && `Deposit: $${popUp.transaction_amount.toFixed(2)}`}</span>
                                <span style={{color: 'red'}}>{popUp.transaction_amount < 0 && `Withdrawal: $${popUp.transaction_amount.toFixed(2).slice(1)}`}</span>
                                <span>{`Merchant: ${popUp.merchant_name}`}</span>
                                <span>{`Merchant ID: ${popUp.merchant_id}`}</span>
                                <span>{`Location: ${popUp.transaction_location}`}</span>
                            </div>
                        </div>
                    }
                    <table className={`transaction-table ${popUp ? 'popup-visible' : ''}`}>
                        <thead className="transaction-head">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Merchant</th>
                            <th>Deposits</th>
                            <th>Withdrawals</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction) => (
                            <React.Fragment key={transaction.transaction_id}>
                                <tr className={getRowColor(transaction)}>
                                    <td><button onClick={() => openTransaction(transaction)}>{transaction.transaction_id}</button></td>
                                    <td>{new Date(transaction.transaction_timestamp).toLocaleDateString()}</td>
                                    <td>{transaction.merchant_name}</td>
                                    <td>{transaction.transaction_amount > 0 ? `$${transaction.transaction_amount.toFixed(2)}` : ''}</td>
                                    <td>{transaction.transaction_amount < 0 ? `$${transaction.transaction_amount.toFixed(2).slice(1)}` : ''}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                    {!atEnd &&
                        <button onClick={fetchData} className={'load_more'}>
                            Load More...
                        </button>
                    }
            </div>
        </>
    )
}

export default FlaggedTransactions