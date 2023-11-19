import {BackendErrorInterface} from 'src/app/types/backend.error.interface';
import {UserResponseInterface} from 'src/app/types/userResponse.interface';

export interface UserUpdateStateInterface {
  isUpdated: boolean;
  profileIsLoading: boolean;
  currentUserProfile: UserResponseInterface | undefined | null;
  validationErrors: BackendErrorInterface | undefined | null;
}
