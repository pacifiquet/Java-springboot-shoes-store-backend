import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map} from 'rxjs';
import {LoginUserResponse} from 'src/app/dto/user/login-user-response';
import {LoginUserRequest} from 'src/app/dto/user/login-user';
import {envirnoment} from 'src/app/env/env';

const API_URL = `${envirnoment.BASE_URL}`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<LoginUserResponse>;
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    let storageUser;

    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<LoginUserResponse>(
      storageUser
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUserResponse {
    return this.currentUserSubject.value;
  }

  login(user: LoginUserRequest): Observable<any> {
    return this.http.post<any>(API_URL + '/auth', user).pipe(
      map((res) => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
        }
        return res;
      })
    );
  }

  loginRequestToken(request: {token: string}): Observable<any> {
    return this.http.get(`${API_URL}/refreshToken?token=${request.token}`).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new LoginUserResponse());
  }
}
