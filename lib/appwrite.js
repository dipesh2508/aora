import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dipesh.aora",
  projectId: "662f8f9700086192ef1e",
  databaseId: "662f90c0000a62174827",
  userCollectionId: "662f90df003cdb4d2739",
  videoCollectionId: "662f90c0000a62174827",
  storageId: "662f924c0023d308d796",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async (email, password, username) => {

    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount){
            throw new Error("Error creating user");
        }

        const avatarUrl = await avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch(e){
        console.error(e);
        throw new Error(e);
    }
}

export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailSession(email, password);
        if(!session){
            throw new Error("Error creating session");
        }

        return session;
    } catch(e){
        console.error(e);
        throw new Error(e);
    }
}

  // Get Current User
export const getCurrentUser = async () =>  {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }