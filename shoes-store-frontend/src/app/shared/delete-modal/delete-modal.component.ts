import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {deleteListProductActions} from 'src/app/admin/store/actions';
import {selectCurrentUser, selectUserProfile} from 'src/app/app.reducer';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent implements OnInit {
  message: string = 'Are you sure to approve this request?';
  isCanceling: boolean = true;

  @Output() deleteEvent = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Input() isDeleting: boolean = true;
  @Input() ids: number[] = [];
  @Input() id!: number;

  user$ = combineLatest({
    currentUser: this.store.select(selectUserProfile),
  });

  constructor(private store: Store) {}
  ngOnInit(): void {}

  approveDelete() {
    this.deleteEvent.emit(this.isCanceling);
    if (this.ids.length > 0) {
      this.store.dispatch(
        deleteListProductActions.productListDelete({request: this.ids})
      );
      window.location.reload();
    }
  }

  cancelDelete() {
    this.cancelEvent.emit(!this.isCanceling);
    console.log(this.isCanceling);
  }
}
