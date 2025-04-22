
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type BoardMember = {
  id: string;
  userId: string;
  boardId: string;
  role: 'owner' | 'editor' | 'viewer';
  user?: User;
};

export type Board = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  ownerId: string;
  members?: BoardMember[];
};

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  boardId: string;
  assigneeId?: string;
  assignee?: User;
  dueDate?: string;
  createdAt: string;
  tags?: string[];
};
