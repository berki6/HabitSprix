import { Account, Client, Databases } from "react-native-appwrite";
import { mockClient, mockDatabases } from "./mock-data";

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const platform = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM;
const dbId = process.env.EXPO_PUBLIC_DB_ID;
const habitsCollectionId = process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID;
const completionsCollectionId = process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID;

// Check if credentials are placeholder values
const isDemoMode = 
  !endpoint || endpoint === 'your_appwrite_endpoint' ||
  !projectId || projectId === 'your_project_id' ||
  !platform || platform === 'your_platform' ||
  !dbId || dbId === 'your_database_id' ||
  !habitsCollectionId || habitsCollectionId === 'your_habits_collection_id' ||
  !completionsCollectionId || completionsCollectionId === 'your_completions_collection_id';

export const DEMO_MODE = isDemoMode;

if (isDemoMode) {
  console.warn("🚧 Running in DEMO MODE - Using mock data. Configure your .env file with real Appwrite credentials to use the full app.");
} else {
  if (!endpoint) throw new Error("EXPO_PUBLIC_APPWRITE_ENDPOINT is not set");
  if (!projectId) throw new Error("EXPO_PUBLIC_APPWRITE_PROJECT_ID is not set");
  if (!platform) throw new Error("EXPO_PUBLIC_APPWRITE_PLATFORM is not set");
  if (!dbId) throw new Error("EXPO_PUBLIC_DB_ID is not set");
  if (!habitsCollectionId) throw new Error("EXPO_PUBLIC_HABITS_COLLECTION_ID is not set");
  if (!completionsCollectionId) throw new Error("EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID is not set");
}

export const client = isDemoMode ? mockClient : new Client()
  .setEndpoint(endpoint!)
  .setProject(projectId!)
  .setPlatform(platform!);

export const account = isDemoMode ? null : new Account(client as Client);
export const databases = isDemoMode ? mockDatabases : new Databases(client as Client);

export const DATABASE_ID = isDemoMode ? "demo_db" : dbId!;
export const HABITS_COLLECTION_ID = isDemoMode ? "demo_habits" : habitsCollectionId!;
export const COMPLETIONS_COLLECTION_ID = isDemoMode ? "demo_completions" : completionsCollectionId!;
export interface RealtimeResponse {
  events: string[];
  payload: any;
}
