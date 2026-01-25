export interface LoginViewProps {
  onSubmit: (data: LoginFormData) => void;
  isSubmitting?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}
