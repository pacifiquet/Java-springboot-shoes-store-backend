export class UserRegiserRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;

  constructor(
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    address: string = '',
    password: string = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.password = password;
  }
}
