import {UserResponseInterface} from '../types/userResponse.interface';

export const selectUserProfileFeature = (state: {
  profile: UserResponseInterface;
}) => state.profile;
