import Navbar from "../components/Navbar.jsx";
import NavBank from "../components/NavBank.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../utils/UseAuth.jsx";
import {getMerchants} from "../utils/MerchantActions.js";

const LOAD_AMOUNT = 3;

function MerchantList () {
    const [merchants, setMerchants] = useState([])
    const [atEnd, setAtEnd] = useState(false)
    const [index, setIndex] = useState(0);
    const {user} = useAuth()

    async function fetchMerchants() {
        const data = await getMerchants(user.$id, index, LOAD_AMOUNT);
        setMerchants(merchants.concat(data))
        if(data.length < LOAD_AMOUNT) {
            setAtEnd(true);
        }
        setIndex(index+LOAD_AMOUNT)
    }

    useEffect(() => {
        fetchMerchants();
    }, [user]);

    const getRowColor = (merchant) => {
        if (merchant.fraud_count/merchant.transaction_count >= .3) {
            return 'red-row';
        } else if (merchant.fraud_count/merchant.transaction_count >= .1) {
            return 'orange-row';
        } else {
            return 'green-row';
        }
    };

    return (
        <>
            <Navbar className="navbar" />
            <NavBank selected="merchant-list" />
            <div className="page">
                <table className={'transaction-table'}>
                    <thead className="transaction-head">
                    <tr>
                        <th>Merchant ID</th>
                        <th>Merchant Name</th>
                        <th>Merchant Category</th>
                        <th>Merchant Location</th>
                        <th>Fraud Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {merchants.map((merchant) => (
                        <React.Fragment key={merchant.merchant_id}>
                            <tr className={getRowColor(merchant)}>
                                <td>{merchant.merchant_id}</td>
                                <td>{merchant.name}</td>
                                <td>{merchant.category}</td>
                                <td>{merchant.location}</td>
                                <td>{`${(merchant.fraud_count/merchant.transaction_count * 100).toFixed(2)}%`}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                {!atEnd &&
                    <button onClick={fetchMerchants} className={'load_more'}>
                        Load More...
                    </button>
                }
            </div>
        </>
    )
}

export default MerchantList