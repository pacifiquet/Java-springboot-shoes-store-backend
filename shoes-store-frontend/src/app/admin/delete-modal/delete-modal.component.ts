import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  message: string = 'Are you sure to approve this request?';
  isDeleting: boolean = true;
  isCanceling: boolean = true;

  @Output() deleteEvent = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<boolean>();
  approveDeleteProduct() {
    this.deleteEvent.emit(!this.isDeleting);
  }
  cancelDeleteProduct() {
    this.cancelEvent.emit(!this.isCanceling);
  }
}