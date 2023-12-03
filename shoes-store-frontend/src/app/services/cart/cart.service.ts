import {Injectable} from '@angular/core';
import {RequestBaseServiceService} from '../request-base-service.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../user/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends RequestBaseServiceService {
  constructor(http: HttpClient, auth: AuthenticationService) {
    super(auth, http);
  }
}
