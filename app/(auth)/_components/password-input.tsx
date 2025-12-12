"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  placeholder?: string;
  showToggle?: boolean;
}

export function PasswordInputField({
  id,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  placeholder = "••••••••",
  showToggle = true,
}: PasswordInputFieldProps) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className={`pl-10 h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl ${
          showToggle ? "pr-10" : ""
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  placeholder?: string;
  showToggle?: boolean;
  hint?: string;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  placeholder = "••••••••",
  showToggle = true,
  hint,
}: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-700 font-medium">
        {label}
      </Label>
      <PasswordInputField
        id={id}
        value={value}
        onChange={onChange}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        placeholder={placeholder}
        showToggle={showToggle}
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
