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
        <div className="flex flex-col items-center justify-center h-full p-3 sm:p-6 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">No Board Selected</h2>
          <p className="text-muted-foreground mb-4">
            Select a board from the sidebar or create a new one
          </p>
        </div>
      </Layout>
    );
  }

  const boardTasks = tasks.filter((task) => task.boardId === currentBoard.id);
  
  const getTasksByStatus = (status: any) => {
    return boardTasks.filter((task) => task.status === status);
  };

  return (
    <Layout>
      <div className="p-2 sm:p-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold animate-slide-in">{currentBoard.title}</h1>
            <p className="text-muted-foreground">{currentBoard.description}</p>
            <span className="block text-xs text-muted-foreground mt-1">
              {currentBoard.members?.length || 1} member{(currentBoard.members?.length || 1) > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
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
                <Button variant="outline" size="sm">
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
        <div className="mb-5 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">MEMBERS</h3>
          <div className="flex flex-wrap gap-2">
            {currentBoard.members?.map((member) => (
              <div 
                key={member.id}
                className="flex items-center bg-white dark:bg-card rounded-full pr-2 shadow-sm border animate-fade-in"
              >
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple flex items-center justify-center text-white mr-2 text-xs sm:text-sm"
                >
                  {member.user?.name.substring(0, 1)}
                </div>
                <span className="text-xs sm:text-sm">{member.user?.name}</span>
                {member.role !== "owner" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 ml-1"
                    onClick={() => removeMember(currentBoard.id, member.userId)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {["todo", "in-progress", "review", "completed"].map((status, i) => (
            <div className="space-y-2 sm:space-y-3" key={status}>
              <h3 className="text-xs sm:text-sm font-medium flex items-center justify-between">
                <span>{status.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}</span>
                <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                  {getTasksByStatus(status).length}
                </span>
              </h3>
              {getTasksByStatus(status).map((task: any) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
