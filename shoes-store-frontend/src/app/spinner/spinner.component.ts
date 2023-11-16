import {Component} from '@angular/core';
import {LoaderService} from '../services/loader.service';
import {Store} from '@ngrx/store';
import {selectIsLoading} from '../store/reducers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading = this.store.select(selectIsLoading);
  constructor(public loader: LoaderService, private store: Store) {}
}
