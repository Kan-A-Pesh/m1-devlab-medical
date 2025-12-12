interface PasswordValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validatePasswords(
  password: string,
  confirmPassword: string
): PasswordValidationResult {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Les mots de passe ne correspondent pas",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: "Le mot de passe doit contenir au moins 8 caractères",
    };
  }

  return { isValid: true, error: null };
}

