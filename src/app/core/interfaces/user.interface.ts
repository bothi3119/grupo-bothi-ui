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
