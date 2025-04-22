
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateBoardForm } from "@/components/CreateBoardForm";

// Add useNavigate for routing when opening boards
export const Dashboard: React.FC = () => {
  const { boards, setCurrentBoard, deleteBoard } = useApp();
  const navigate = useNavigate();

  const openBoard = (board: any) => {
    setCurrentBoard(board);
    navigate("/board");
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold animate-bounce">My Boards</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Board
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Board</DialogTitle>
                <DialogDescription>
                  Add a new board to organize your tasks
                </DialogDescription>
              </DialogHeader>
              <CreateBoardForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card key={board.id} className="board-card animate-slide-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{board.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => deleteBoard(board.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground">
                    {(board.members?.length || 1)} member{(board.members?.length || 1) > 1 ? "s" : ""}
                  </div>
                  <div className="flex -space-x-2">
                    {board.members?.slice(0, 3).map((member) => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white border-2 border-background"
                        title={member.user?.name}
                      >
                        {member.user?.name.substring(0, 1)}
                      </div>
                    ))}
                    {(board.members?.length || 0) > 3 && (
                      <div 
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs border-2 border-background"
                      >
                        +{board.members!.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full animate-bounce" 
                  variant="outline"
                  onClick={() => openBoard(board)}
                >
                  Open Board
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

