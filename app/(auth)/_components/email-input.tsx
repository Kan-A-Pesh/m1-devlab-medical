"use client";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hint?: string;
}

export function EmailInput({
  id = "email",
  value,
  onChange,
  disabled = false,
  hint,
}: EmailInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-700 font-medium">
        Adresse email
      </Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          id={id}
          type="email"
          placeholder="vous@exemple.com"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          disabled={disabled}
          className={`pl-10 h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl ${
            disabled ? "disabled:bg-slate-50 disabled:text-slate-500" : ""
          }`}
        />
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

