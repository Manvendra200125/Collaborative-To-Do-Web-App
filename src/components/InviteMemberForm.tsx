
import React from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  email: string;
  role: "editor" | "viewer";
}

export const InviteMemberForm: React.FC = () => {
  const { inviteMember, currentBoard } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      role: "editor",
    },
  });

  const role = watch("role") as "editor" | "viewer";

  const onSubmit = (data: FormData) => {
    if (!currentBoard) return;
    
    inviteMember(currentBoard.id, data.email, data.role);
    reset();
  };

  if (!currentBoard) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email address"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Role</Label>
        <Select
          value={role}
          onValueChange={(value) => setValue("role", value as "editor" | "viewer")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="editor">Editor (can edit)</SelectItem>
            <SelectItem value="viewer">Viewer (read-only)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">Invite Member</Button>
        </DialogClose>
      </div>
    </form>
  );
};
