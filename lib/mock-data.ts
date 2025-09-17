import { Habit, HabitCompletion } from "../types/database.type";

// Mock data for demo mode
const mockHabits: Habit[] = [
  {
    $id: "1",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_habits",
    $sequence: 1,
    user_id: "demo_user",
    title: "Drink Water",
    description: "Drink 8 glasses of water daily",
    frequency: "daily",
    streak_count: 5,
    last_completed: new Date(Date.now() - 86400000).toISOString(), // yesterday
    created_at: new Date().toISOString(),
  },
  {
    $id: "2",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_habits",
    $sequence: 2,
    user_id: "demo_user",
    title: "Exercise",
    description: "30 minutes of exercise",
    frequency: "daily",
    streak_count: 3,
    last_completed: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    $id: "3",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_habits",
    $sequence: 3,
    user_id: "demo_user",
    title: "Read",
    description: "Read for 20 minutes",
    frequency: "daily",
    streak_count: 7,
    last_completed: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

const mockCompletions: HabitCompletion[] = [
  {
    $id: "c1",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_completions",
    $sequence: 1,
    user_id: "demo_user",
    habit_id: "1",
    completed_at: new Date().toISOString(),
  },
  {
    $id: "c2",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_completions",
    $sequence: 2,
    user_id: "demo_user",
    habit_id: "2",
    completed_at: new Date().toISOString(),
  },
  {
    $id: "c3",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_completions",
    $sequence: 3,
    user_id: "demo_user",
    habit_id: "3",
    completed_at: new Date().toISOString(),
  },
  // Add some historical completions for streak calculation
  {
    $id: "c4",
    $createdAt: new Date(Date.now() - 86400000).toISOString(),
    $updatedAt: new Date(Date.now() - 86400000).toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_completions",
    $sequence: 4,
    user_id: "demo_user",
    habit_id: "1",
    completed_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    $id: "c5",
    $createdAt: new Date(Date.now() - 172800000).toISOString(),
    $updatedAt: new Date(Date.now() - 172800000).toISOString(),
    $permissions: [],
    $databaseId: "demo_db",
    $collectionId: "demo_completions",
    $sequence: 5,
    user_id: "demo_user",
    habit_id: "1",
    completed_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const mockDatabases = {
  listDocuments: async (databaseId: string, collectionId: string, options: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (collectionId === "demo_habits") {
      return {
        documents: mockHabits,
        total: mockHabits.length,
      };
    } else if (collectionId === "demo_completions") {
      return {
        documents: mockCompletions,
        total: mockCompletions.length,
      };
    }

    return { documents: [], total: 0 };
  },

  createDocument: async (databaseId: string, collectionId: string, documentId: string, data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (collectionId === "demo_completions") {
      const newCompletion: HabitCompletion = {
        $id: documentId,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $databaseId: databaseId,
        $collectionId: collectionId,
        $sequence: mockCompletions.length + 1,
        user_id: data.user_id,
        habit_id: data.habit_id,
        completed_at: data.completed_at,
      };
      mockCompletions.push(newCompletion);
      return newCompletion;
    }

    return null;
  },

  updateDocument: async (databaseId: string, collectionId: string, documentId: string, data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (collectionId === "demo_habits") {
      const habit = mockHabits.find(h => h.$id === documentId);
      if (habit) {
        Object.assign(habit, data);
        habit.$updatedAt = new Date().toISOString();
        return habit;
      }
    }

    return null;
  },

  deleteDocument: async (databaseId: string, collectionId: string, documentId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (collectionId === "demo_habits") {
      const index = mockHabits.findIndex(h => h.$id === documentId);
      if (index > -1) {
        mockHabits.splice(index, 1);
      }
    }

    return true;
  },
};

export const mockClient = {
  subscribe: (channel: string, callback: (response: any) => void) => {
    // Mock subscription - doesn't do anything in demo mode
    return () => {}; // Return unsubscribe function
  },
};