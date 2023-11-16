import {Injectable} from '@angular/core';
import {envirnoment} from 'src/app/env/env';
import {UserRegiserRequest} from '../../dto/user/user-register-request';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RequestBaseServiceService} from '../request-base-service.service';
import {AuthenticationService} from './authentication.service';
import {PasswordChangeRequest} from 'src/app/dto/user/password-change-request';
import {PasswordResetRequest} from 'src/app/dto/user/password-reset-request';

const BASE_URL = `${envirnoment.BASE_URL}`;
@Injectable({
  providedIn: 'root',
})
export class UserService extends RequestBaseServiceService {
  private userResponseSubject = new BehaviorSubject<any>(null);

  constructor(http: HttpClient, auth: AuthenticationService) {
    super(auth, http);
  }

  registerUser(user: UserRegiserRequest): Observable<any> {
    return this.http.post(BASE_URL + '/users', user);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(BASE_URL + '/users/profile', {
      headers: this.getHeaders(),
    });
  }

  getUserById(userId: number): Observable<any> {
    this.http
      .get(BASE_URL + `/users/${userId}`, {
        headers: this.getHeaders(),
      })
      .subscribe((response) => {
        this.userResponseSubject.next(response);
      });
    return this.userResponseSubject.asObservable();
  }

  updateUser(
    fileProfile: File,
    userInfo: string,
    userId: number
  ): Observable<any> {
    const formData = new FormData();
    const contentType: string =
      'multipart/form-data; boundary --- WebKit193844043-h';
    formData.append('profile', fileProfile);
    formData.append('otherUserInfo', userInfo);

    this.http
      .put(BASE_URL + `/users/${userId}`, formData, {
        headers: this.getHeaders(),
      })
      .subscribe((response) => {
        if (response) {
          this.userResponseSubject.next(response);
        }
      });
    return this.userResponseSubject.asObservable();
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(BASE_URL + `/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  changePassword(passwordRequest: PasswordChangeRequest): Observable<any> {
    return this.http.post(
      BASE_URL + '/users/account/password/change',
      passwordRequest,
      {headers: this.getHeaders()}
    );
  }

  verifyNewAccount(token: string): Observable<any> {
    return this.http.get(
      BASE_URL + `/users/account/verifyRegistration?token=${token}`
    );
  }

  requestNewToken(oldToken: string): Observable<any> {
    return this.http.get(
      BASE_URL + `/users/account/requestNewToken?oldToken=${oldToken}`
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.get(
      BASE_URL + `/users/account/password/forgot?email=${email}`
    );
  }

  saveResetPassword(
    token: string,
    requestObj: PasswordResetRequest
  ): Observable<any> {
    return this.http.post(
      BASE_URL + `/users/account/password/save?token=${token}`,
      requestObj
    );
  }
}
