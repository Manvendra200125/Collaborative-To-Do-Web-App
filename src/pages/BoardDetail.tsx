
import React from "react";
import { useApp } from "../contexts/AppContext";
import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash, Users } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { InviteMemberForm } from "@/components/InviteMemberForm";
import { TaskStatus } from "@/types";

export const BoardDetail: React.FC = () => {
  const { currentBoard, tasks, deleteBoard, removeMember } = useApp();

  if (!currentBoard) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h2 className="text-2xl font-bold mb-2">No Board Selected</h2>
          <p className="text-muted-foreground mb-4">
            Select a board from the sidebar or create a new one
          </p>
        </div>
      </Layout>
    );
  }

  const boardTasks = tasks.filter((task) => task.boardId === currentBoard.id);
  
  const getTasksByStatus = (status: TaskStatus) => {
    return boardTasks.filter((task) => task.status === status);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentBoard.title}</h1>
            <p className="text-muted-foreground">{currentBoard.description}</p>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your board
                  </DialogDescription>
                </DialogHeader>
                <CreateTaskForm />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Member</DialogTitle>
                  <DialogDescription>
                    Invite a new member to collaborate on this board
                  </DialogDescription>
                </DialogHeader>
                <InviteMemberForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">MEMBERS</h3>
          <div className="flex flex-wrap gap-2">
            {currentBoard.members?.map((member) => (
              <div 
                key={member.id}
                className="flex items-center bg-white rounded-full pr-2 shadow-sm border"
              >
                <div 
                  className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white mr-2"
                >
                  {member.user?.name.substring(0, 1)}
                </div>
                <span className="text-sm">{member.user?.name}</span>
                {member.role !== "owner" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-1"
                    onClick={() => removeMember(currentBoard.id, member.userId)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium flex items-center justify-between">
              <span>To Do</span>
              <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {getTasksByStatus("todo").length}
              </span>
            </h3>
            {getTasksByStatus("todo").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center justify-between">
              <span>In Progress</span>
              <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {getTasksByStatus("in-progress").length}
              </span>
            </h3>
            {getTasksByStatus("in-progress").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center justify-between">
              <span>Review</span>
              <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {getTasksByStatus("review").length}
              </span>
            </h3>
            {getTasksByStatus("review").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium flex items-center justify-between">
              <span>Completed</span>
              <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {getTasksByStatus("completed").length}
              </span>
            </h3>
            {getTasksByStatus("completed").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
