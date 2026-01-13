import { Client, Account, Databases, Functions, Teams } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('67e01f9800293b69bbc3');
export default client;

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export const teams = new Teams(client);