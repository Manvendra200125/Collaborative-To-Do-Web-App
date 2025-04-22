
import React, { createContext, useContext, useEffect, useState } from "react";
import { Board, Task, User } from "../types";
import { currentUser, mockBoards, mockTasks } from "../data/mockData";
import { toast } from "sonner";

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  
  // Boards
  boards: Board[];
  currentBoard: Board | null;
  setCurrentBoard: (board: Board | null) => void;
  createBoard: (data: Partial<Board>) => void;
  updateBoard: (id: string, data: Partial<Board>) => void;
  deleteBoard: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  createTask: (data: Partial<Task>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Members
  inviteMember: (boardId: string, email: string, role: 'editor' | 'viewer') => void;
  removeMember: (boardId: string, userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  // Load mock data
  useEffect(() => {
    if (isAuthenticated) {
      setBoards(mockBoards);
      setTasks(mockTasks);
    } else {
      setBoards([]);
      setTasks([]);
      setCurrentBoard(null);
    }
  }, [isAuthenticated]);

  // Auth functions
  const login = async (phone: string) => {
    // Simulate OTP sending
    setVerificationInProgress(true);
    toast.success(`OTP sent to ${phone}`);
    // In a real app, this would call a backend API to send OTP
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Simulate OTP verification
    // In a real app, this would validate against a backend
    if (otp === "123456") {
      setUser(currentUser);
      setIsAuthenticated(true);
      setVerificationInProgress(false);
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid OTP. Try 123456");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
  };

  // Board functions
  const createBoard = (data: Partial<Board>) => {
    if (!user) return;
    
    const newBoard: Board = {
      id: `board${Date.now()}`,
      title: data.title || "Untitled Board",
      description: data.description || "",
      createdAt: new Date().toISOString(),
      ownerId: user.id,
      members: [
        {
          id: `member${Date.now()}`,
          userId: user.id,
          boardId: `board${Date.now()}`,
          role: "owner",
          user: user,
        },
      ],
    };
    
    setBoards((prev) => [...prev, newBoard]);
    toast.success("Board created successfully");
  };

  const updateBoard = (id: string, data: Partial<Board>) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === id ? { ...board, ...data } : board
      )
    );
    
    // Update current board if it's the one being edited
    if (currentBoard?.id === id) {
      setCurrentBoard((prev) => (prev ? { ...prev, ...data } : prev));
    }
    
    toast.success("Board updated successfully");
  };

  const deleteBoard = (id: string) => {
    setBoards((prev) => prev.filter((board) => board.id !== id));
    
    // Clear current board if it's the one being deleted
    if (currentBoard?.id === id) {
      setCurrentBoard(null);
    }
    
    // Delete associated tasks
    setTasks((prev) => prev.filter((task) => task.boardId !== id));
    
    toast.success("Board deleted successfully");
  };

  // Task functions
  const createTask = (data: Partial<Task>) => {
    if (!data.boardId) return;
    
    const newTask: Task = {
      id: `task${Date.now()}`,
      title: data.title || "Untitled Task",
      description: data.description || "",
      status: data.status || "todo",
      priority: data.priority || "medium",
      boardId: data.boardId,
      assigneeId: data.assigneeId || user?.id,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
      tags: data.tags || [],
    };
    
    setTasks((prev) => [...prev, newTask]);
    toast.success("Task created successfully");
  };

  const updateTask = (id: string, data: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...data } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  // Member functions
  const inviteMember = (boardId: string, email: string, role: 'editor' | 'viewer') => {
    // In a real app, this would send an invitation email
    toast.success(`Invitation sent to ${email}`);
    
    // Just for demo, we'll add the user instantly
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          // Find a mock user with the provided email
          const mockUser = mockBoards
            .flatMap((b) => b.members || [])
            .find((m) => m.user?.email === email)?.user;
            
          if (!mockUser) {
            return board;
          }
          
          const newMember = {
            id: `member${Date.now()}`,
            userId: mockUser.id,
            boardId: boardId,
            role: role,
            user: mockUser,
          };
          
          return {
            ...board,
            members: [...(board.members || []), newMember],
          };
        }
        return board;
      })
    );
  };

  const removeMember = (boardId: string, userId: string) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            members: (board.members || []).filter((m) => m.userId !== userId),
          };
        }
        return board;
      })
    );
    toast.success("Member removed successfully");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    verifyOtp,
    boards,
    currentBoard,
    setCurrentBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    tasks,
    createTask,
    updateTask,
    deleteTask,
    inviteMember,
    removeMember,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
