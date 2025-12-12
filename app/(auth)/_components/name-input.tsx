"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

export function NameInput({ id = "name", value, onChange }: NameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-700 font-medium">
        Nom complet
      </Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          id={id}
          type="text"
          placeholder="Jean Dupont"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="pl-10 h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
        />
      </div>
    </div>
  );
}

