import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Plus, Sun, Moon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateBoardForm } from "./CreateBoardForm";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout, user } = useApp();

  // Responsive: collapse sidebar for mobile, make header stick.
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col sm:flex-row w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="flex items-center justify-between px-4 py-2 h-12 sm:h-14">
            <div className="flex items-center space-x-2">
              <div className="font-bold text-lg sm:text-xl text-purple-dark">Flow Tasks</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <BoardList />
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-12 sm:h-14 border-b flex items-center justify-between px-2 sm:px-4 sticky top-0 bg-background z-20">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark((v) => !v)}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="hover-scale"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <div className="text-xs sm:text-sm font-medium">{user?.name}</div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const BoardList = () => {
  const { boards, setCurrentBoard, currentBoard } = useApp();
  
  return (
    <div className="p-1 sm:p-3">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <h2 className="font-medium text-xs sm:text-sm text-muted-foreground">MY BOARDS</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-sm">
              <Plus className="h-4 w-4" />
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
      <nav className="space-y-1">
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => setCurrentBoard(board)}
            className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              currentBoard?.id === board.id
                ? "bg-purple/10 text-purple-dark"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {board.title}
          </button>
        ))}
      </nav>
    </div>
  );
};
