export class UserResponse {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  role?: string;
  profile?: string;

  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    address?: string,
    profile?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.id = id;
    this.profile = profile;
  }
}
