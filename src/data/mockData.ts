
import { Board, Task, User } from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6d28d9&color=fff",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=7c3aed&color=fff",
  },
  {
    id: "user3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff",
  },
];

// Current logged in user
export const currentUser: User = mockUsers[0];

// Mock Boards
export const mockBoards: Board[] = [
  {
    id: "board1",
    title: "Project Alpha",
    description: "Main development board for Project Alpha",
    createdAt: "2023-09-15T10:00:00Z",
    ownerId: "user1",
    members: [
      { id: "member1", userId: "user1", boardId: "board1", role: "owner", user: mockUsers[0] },
      { id: "member2", userId: "user2", boardId: "board1", role: "editor", user: mockUsers[1] },
    ],
  },
  {
    id: "board2",
    title: "Marketing Campaign",
    description: "Q2 Marketing Campaign planning",
    createdAt: "2023-10-05T14:30:00Z",
    ownerId: "user1",
    members: [
      { id: "member3", userId: "user1", boardId: "board2", role: "owner", user: mockUsers[0] },
      { id: "member4", userId: "user3", boardId: "board2", role: "viewer", user: mockUsers[2] },
    ],
  },
  {
    id: "board3",
    title: "Personal Tasks",
    description: "My personal to-do list",
    createdAt: "2023-11-10T09:15:00Z",
    ownerId: "user1",
    members: [
      { id: "member5", userId: "user1", boardId: "board3", role: "owner", user: mockUsers[0] },
    ],
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Design user interface",
    description: "Create wireframes for the main dashboard",
    status: "completed",
    priority: "high",
    boardId: "board1",
    assigneeId: "user2",
    assignee: mockUsers[1],
    dueDate: "2023-09-20T23:59:59Z",
    createdAt: "2023-09-16T11:30:00Z",
    tags: ["design", "ui"],
  },
  {
    id: "task2",
    title: "Implement authentication",
    description: "Set up Firebase authentication with email and phone",
    status: "in-progress",
    priority: "high",
    boardId: "board1",
    assigneeId: "user1",
    assignee: mockUsers[0],
    dueDate: "2023-09-25T23:59:59Z",
    createdAt: "2023-09-17T09:45:00Z",
    tags: ["development", "auth"],
  },
  {
    id: "task3",
    title: "Database schema design",
    description: "Create initial schema for PostgreSQL database",
    status: "review",
    priority: "medium",
    boardId: "board1",
    assigneeId: "user1",
    assignee: mockUsers[0],
    dueDate: "2023-09-22T23:59:59Z",
    createdAt: "2023-09-18T14:15:00Z",
    tags: ["database", "planning"],
  },
  {
    id: "task4",
    title: "Create social media posts",
    description: "Design and schedule posts for Facebook and Instagram",
    status: "todo",
    priority: "medium",
    boardId: "board2",
    assigneeId: "user3",
    assignee: mockUsers[2],
    dueDate: "2023-10-15T23:59:59Z",
    createdAt: "2023-10-06T10:20:00Z",
    tags: ["marketing", "social"],
  },
  {
    id: "task5",
    title: "Email newsletter design",
    description: "Design template for monthly newsletter",
    status: "in-progress",
    priority: "low",
    boardId: "board2",
    assigneeId: "user1",
    assignee: mockUsers[0],
    dueDate: "2023-10-20T23:59:59Z",
    createdAt: "2023-10-07T15:40:00Z",
    tags: ["design", "email"],
  },
  {
    id: "task6",
    title: "Buy groceries",
    description: "Get milk, eggs, bread, and vegetables",
    status: "todo",
    priority: "medium",
    boardId: "board3",
    assigneeId: "user1",
    assignee: mockUsers[0],
    dueDate: "2023-11-12T23:59:59Z",
    createdAt: "2023-11-10T10:00:00Z",
    tags: ["personal", "shopping"],
  },
  {
    id: "task7",
    title: "Pay utility bills",
    description: "Electricity, water, and internet bills",
    status: "completed",
    priority: "high",
    boardId: "board3",
    assigneeId: "user1",
    assignee: mockUsers[0],
    dueDate: "2023-11-15T23:59:59Z",
    createdAt: "2023-11-10T10:15:00Z",
    tags: ["personal", "finance"],
  },
];
