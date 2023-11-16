import {UserResponseInterface} from './userResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface UserResponseStateInterface {
  userProfile: UserResponseInterface | undefined | null;
  isProfileLoaded: boolean;
  profileError: BackendErrorInterface | undefined | null;
}
