import Navbar from "../components/Navbar.jsx";
import NavCus from "../components/NavCus.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../utils/UseAuth.jsx";
import {getPendingTransactions, updateTransactionStatus} from "../utils/TransactionActions.js";

const LOAD_AMOUNT = 20;

function PendingAction() {
    const [transactions, setTransactions] = useState([]);
    const [popUp, setPopUp] = useState(null);
    const [index, setIndex] = useState(0);
    const [atEnd, setAtEnd] = useState(false);
    const {user} = useAuth()

    async function fetchData() {
        const data = await getPendingTransactions(user.$id, index, LOAD_AMOUNT);
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

    const approve = () => {
        updateTransactionStatus(popUp, 'approved');
        setPopUp(null);
    }

    const decline = () => {
        updateTransactionStatus(popUp, 'declined');
        setPopUp(null);
    }

    return (
        <>
            <Navbar />
            <NavCus selected='pending-action'/>
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
                            <span>{`Location: ${popUp.transaction_location}`}</span>
                            <div style={{justifyContent: 'center', marginTop: '20px'}} className={'popup-header'}>
                                <button onClick={approve} style={{paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'whitesmoke', border: '1px, solid, black'}}>
                                    Approve
                                </button>
                                <button onClick={decline} style={{paddingRight: '20px', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'whitesmoke', border: '1px, solid, black'}}>
                                    Decline
                                </button>
                            </div>
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

export default PendingAction;