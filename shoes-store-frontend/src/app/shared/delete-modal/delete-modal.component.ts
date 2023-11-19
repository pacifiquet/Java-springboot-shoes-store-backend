import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {selectCurrentUser, selectUserProfile} from 'src/app/app.reducer';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  message: string = 'Are you sure to approve this request?';
  isCanceling: boolean = true;

  @Output() deleteEvent = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Input() isDeleting = true;

  user$ = combineLatest({
    currentUser: this.store.select(selectUserProfile),
  });

  constructor(private store: Store) {}
  approveDeleteProduct(userId: any) {
    this.deleteEvent.emit(userId);
  }
  cancelDeleteProduct() {
    this.cancelEvent.emit(!this.isCanceling);
  }
}
