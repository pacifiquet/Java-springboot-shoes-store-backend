export class LoginUserResponse {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  role?: string;
  profile?: string;
  tokens?: Token;
}

type Token = {
  token?: string;
  refreshToken?: string;
};
