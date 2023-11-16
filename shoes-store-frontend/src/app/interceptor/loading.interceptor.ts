import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';
import {Store} from '@ngrx/store';
import {selectIsLoading} from '../store/reducers';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  isLoading = this.store.select(selectIsLoading);

  constructor(private loadingService: LoaderService, private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next
      .handle(request)
      .pipe
      // finalize(() => {
      //   this.totalRequests--;
      //   if (this.totalRequests == 0) {
      //     this.loadingService.setLoading(false);
      //   }
      // })
      ();
  }
}
