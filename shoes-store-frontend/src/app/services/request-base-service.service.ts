import {Injectable} from '@angular/core';
import {AuthenticationService} from './user/authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUserResponse} from '../dto/user/login-user-response';

@Injectable({
  providedIn: 'root',
})
export class RequestBaseServiceService {
  protected currentUser: LoginUserResponse = new LoginUserResponse();
  constructor(
    protected auth: AuthenticationService,
    protected http: HttpClient
  ) {
    this.auth.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser?.tokens?.token,
    });
  }
}
