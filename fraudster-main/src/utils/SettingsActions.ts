import {databases} from "../appwriteConfig"
import {Query} from "appwrite";
import {Settings, Transaction} from "../types";
import {getAmountSpent} from "./TransactionActions";
import {getMerchant} from "./MerchantActions";

// @ts-ignore
export async function createSettings(id: string): void {
    await databases.createDocument(
        '67e04d26003294165c25',
        '67f687b7002e607baeef',
        id,
        {
            customer_id: id
        }
    );
}

// @ts-ignore
export async function getSettings(userId: string): Promise<Settings> {
    const response = await databases.listDocuments(
        '67e04d26003294165c25',
        '67f687b7002e607baeef',
        [
            Query.equal('customer_id', userId)
        ]
    );

    return response.documents
        .map((doc) => ({
            customer_id: doc.customer_id,
            start_time: doc.start_time,
            end_time: doc.end_time,
            daily_limit: doc.daily_limit,
            weekly_limit: doc.weekly_limit,
            monthly_limit: doc.monthly_limit,
            purchase_limit: doc.purchase_limit,
            block_online_purchases: doc.block_online_purchases,
            block_international_purchases: doc.block_international_purchases,
            home_state: doc.home_state,
            home_city: doc.home_city,
            gambling: doc.gambling,
            adult_entertainment: doc.adult_entertainment,
            liquor_stores: doc.liquor_stores
        }))[0];
}

// @ts-ignore
export async function updateSettings(userId: string, settings: Settings): void {
    await databases.updateDocument(
        '67e04d26003294165c25',
        '67f687b7002e607baeef',
        userId,
        settings
    )
}
// @ts-ignore
export async function checkSettings(transaction: Transaction, settings:　Settings): Promise<string> {
    let approved = true;

    // checkLocation
    // array for street address, city, state, country
    let transactionArr = transaction.transaction_location.split(', ')

    settings.home_city && settings.home_city !== '' && transactionArr[1] !== settings.home_city ? approved = false : approved;
    settings.home_state && settings.home_state !== '' && transactionArr[2] !== settings.home_state ? approved = false : approved;
    transactionArr[3] && transactionArr[3] !== 'USA' ? approved = false : approved;

    settings.block_online_purchases && transaction.online ? approved = false : approved;

    // checkSpending
    settings.purchase_limit && settings.purchase_limit < -transaction.transaction_amount ? approved = false : approved;
    let theDate = new Date(transaction.transaction_timestamp)
    theDate.setDate(theDate.getDate()-1);
    settings.daily_limit && await getAmountSpent(transaction.customer_id, theDate.toISOString()) - transaction.transaction_amount > settings.daily_limit ? approved = false : approved;
    theDate.setDate(theDate.getDate()-6);
    settings.weekly_limit && await getAmountSpent(transaction.customer_id, theDate.toISOString()) - transaction.transaction_amount > settings.weekly_limit ? approved = false : approved;
    theDate.setDate(theDate.getDate()-23);
    settings.monthly_limit && await getAmountSpent(transaction.customer_id, theDate.toISOString()) - transaction.transaction_amount > settings.monthly_limit ? approved = false : approved;

    // checkCategory
    const blockedCategories: { [key: string]: boolean } = {
        gambling: settings.gambling,
        adult_entertainment: settings.adult_entertainment,
        liquor_store: settings.liquor_stores
    };

    const categoryKey = transaction.transaction_type.toLowerCase().replace(/\s/g, '_');
    console.log(categoryKey);
    if (blockedCategories[categoryKey]) {
        approved = false;
    }

    // checkTime
    theDate = new Date(transaction.transaction_timestamp)
    if(settings.start_time < settings.end_time) {
        theDate.toTimeString() > settings.start_time && theDate.toTimeString() < settings.end_time ? approved = false : approved
    } else {
        theDate.toTimeString() > settings.start_time || theDate.toTimeString() < settings.end_time ? approved = false : approved
    }

    // merchant check
    const merchant = await getMerchant(transaction.merchant_id)
    const merchantRate = merchant.fraud_count/merchant.transaction_count

    if (!approved) {
        return 'declined'
    } else if (merchantRate >= .3) {
        return 'declined'
    } else if (merchantRate >= .1) {
        return 'pending'
    } else {
        return 'approved'
    }
}