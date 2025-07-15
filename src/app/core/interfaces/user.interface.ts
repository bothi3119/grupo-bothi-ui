export interface User extends UserResponse {
  id: number;
  first_name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager' | 'user';
  created_at: string;
  updated_at: string;
  active: boolean;
  avatar?: string;
}

export interface CreateUser {
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  phone: string;
}

export interface EditUser extends CreateUser {}

export interface UserResponse {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SetPassword {
  new_password: string;
  new_password_confirmation: string;
  token?: string;
}

export interface ResetPassword {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface UpdatePassword {
  token: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface PasswordResponse {
  message: string;
  user: UserResponse;
}

export interface Message {
  message: string;
}
export interface LoginResponse {
  token: string;
  user: UserResponse;
}
