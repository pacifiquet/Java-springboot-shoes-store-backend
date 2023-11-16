import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {}
