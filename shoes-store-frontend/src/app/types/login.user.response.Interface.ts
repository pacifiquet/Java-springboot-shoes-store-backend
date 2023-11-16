export interface LoginUserResponseInterface {
  id?: number
  email?: string
  firstName?: string
  lastName?: string
  address?: string
  role?: string
  profile?: string
  tokens?: {
    token: string
    refreshToken: string
  }
}
