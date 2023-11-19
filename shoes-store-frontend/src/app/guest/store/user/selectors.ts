import {RequestNewTokenInterfaceState} from 'src/app/types/requestNewToken.interface';
import {UserResponseInterface} from '../../../types/userResponse.interface';

export const selectUserProfileFeature = (state: {
  profile: UserResponseInterface;
}) => state.profile;

export const selectSuccessNewTokenFeature = (state: {
  successNewToken: RequestNewTokenInterfaceState;
}) => state.successNewToken.successNewVerifyToken;
