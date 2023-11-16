export interface UserResponseInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  profile: string | undefined | null;
  createdAt: string;
}
