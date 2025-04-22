
import React from "react";
import { Task } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { EditTaskForm } from "./EditTaskForm";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useApp();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };
  
  const getRandomTagColor = (tag: string) => {
    const colors = ["task-tag-purple", "task-tag-green", "task-tag-yellow", "task-tag-blue", "task-tag-pink"];
    // Simple hash function to consistently pick a color for the same tag
    const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="task-card animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex space-x-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>Make changes to your task</DialogDescription>
              </DialogHeader>
              <EditTaskForm task={task} />
            </DialogContent>
          </Dialog>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => deleteTask(task.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
      )}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags?.map((tag) => (
          <span key={tag} className={`task-tag ${getRandomTagColor(tag)}`}>
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {task.assignee && (
            <div className="flex items-center">
              <div 
                className="w-6 h-6 rounded-full bg-purple flex items-center justify-center text-white text-xs"
                title={task.assignee.name}
              >
                {task.assignee.name.substring(0, 1)}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
};
