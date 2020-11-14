import {User} from '../../shared/models/users/User';
import {LogState} from './log.state';
import {UserLoginCmdDto} from '../../shared/models/users/UserLoginCmdDto';

export interface UserState extends LogState{
  loading: boolean;
  loaded: boolean;
  connectedUser?: User;
}
