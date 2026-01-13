import {databases} from "../appwriteConfig"
import { ID, Query } from 'appwrite'

// @ts-ignore
export async function getMerchant(merchantID: string): Promise<Merchant> {
    const response = await databases.listDocuments(
        '67e04d26003294165c25',
        '67fd21fc0023f61af4d9',
        [
            Query.equal('merchant_id', merchantID)
        ]
    );

    return response.documents.map((doc) => ({
        merchant_id: doc.merchant_id,
        location: doc.location,
        category: doc.category,
        name: doc.name,
        transaction_count: doc.transaction_count,
        fraud_count: doc.fraud_count,
        bank_id: doc.bank_id
    }))[0];
}

// @ts-ignore
async function getMerchantRecord(merchantID: string): Promise<string> {
    const response = await databases.listDocuments(
        '67e04d26003294165c25',
        '67fd21fc0023f61af4d9',
        [
            Query.equal('merchant_id', merchantID)
        ]
    );

    return response.documents[0].$id;
}

// @ts-ignore
export async function updateMerchantTotals(merchantID: string, type: string): void {
    const merchant = await getMerchant(merchantID)
    const merchantDocID = await getMerchantRecord(merchantID)

    if (type === 'increaseTotal') {
        merchant.transaction_count += 1;
    } else if (type === 'increaseFraud') {
        merchant.fraud_count += 1;
    } else if (type === 'decreaseFraud') {
        merchant.fraud_count -= 1;
    }

    await databases.updateDocument(
        '67e04d26003294165c25',
        '67fd21fc0023f61af4d9',
        merchantDocID,
        merchant
    )
}

// @ts-ignore
export async function getMerchants(bankID: string, index: number, loadAmount: number): Promise<Merchant[]> {
    const response = await databases.listDocuments(
        '67e04d26003294165c25',
        '67fd21fc0023f61af4d9',
        [
            Query.offset(index),
            Query.limit(loadAmount),
            Query.equal('bank_id', bankID),
            Query.orderAsc('merchant_id')
        ]
    );

    console.log(response);

    return response.documents.map((doc) => ({
        merchant_id: doc.merchant_id,
        location: doc.location,
        category: doc.category,
        name: doc.name,
        transaction_count: doc.transaction_count,
        fraud_count: doc.fraud_count,
        bank_id: doc.bank_id
    }));
}

// @ts-ignore
export async function createMerchant(merchantInfo: Merchant): void {
    await databases.createDocument(
        '67e04d26003294165c25',
        '67fd21fc0023f61af4d9',
        ID.unique(),
        {
            merchant_id: merchantInfo.merchant_id,
            location: merchantInfo.location,
            category: merchantInfo.category,
            name: merchantInfo.name,
            transaction_count: merchantInfo.transaction_count,
            fraud_count: merchantInfo.fraud_count,
            bank_id: merchantInfo.bank_id
        }
    );
}