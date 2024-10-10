// appwrite.js
import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.supplyChain.indusChain',
    projectId: '6704b1640010c980e906',
    databaseId: '67069945001092f38374',
    userCollectionId: '67069968000158bda1da',
    storageId: '6706c30e00115eacebd2',
};

const client = new Client();

// Set up the Appwrite client with the correct configuration
client
    .setEndpoint(appwriteConfig.endpoint) // Use the correct config reference
    .setProject(appwriteConfig.projectId); // Use the correct config reference

// Initialize Account, Avatars, and Databases
const account = new Account(client);
// const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new user
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw new Error('Account creation failed');

       

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
            
            }
        );
        
        

        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(error.message); // Provide the error message for easier debugging
    }
};

// Function to sign in the user
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error(error);
        throw new Error(error.message); // Provide the error message for easier debugging
    }
};

// Function to get the current user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error('No current user');
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId, // Correct reference
            appwriteConfig.userCollectionId, // Correct reference
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw new Error('No user found');
        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
        throw new Error(error.message); // Provide the error message for easier debugging
    }
};

// Function to log out the current user
export const logout = async () => {
    try {
        await account.deleteSessions('current');
    } catch (error) {
        console.error(error);
        throw new Error(error.message); // Provide the error message for easier debugging
    }
};
