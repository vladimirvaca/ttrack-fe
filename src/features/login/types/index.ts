export interface LoginViewProps {
  onSubmit: (data: LoginFormData) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}
