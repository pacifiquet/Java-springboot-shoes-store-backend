import {Component} from '@angular/core';
import {LoaderService} from '../services/loader.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  constructor(public loader: LoaderService, private store: Store) {}
}
