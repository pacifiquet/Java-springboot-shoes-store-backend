import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  isAccountProfile: boolean = false;
  isTransactions: boolean = true;
  isDeleteAccount: boolean = false;

  isCompletedAction: boolean = false;
  isCancelledAction: boolean = false;
  isToRecieveAction: boolean = false;

  isMarkerComplete: boolean = false;
  isMarkerCancaled: boolean = false;
  isMarkerToRecieve: boolean = false;
  isCancelOrder: boolean = false;

  @Input() deleteMessage: string =
    'did you request to delete your account? your acount is deleted parmanently';

  deleteAccount() {
    this.isDeleteAccount = true;
  }

  deleteAccountHandler(event: boolean) {
    this.isDeleteAccount = event;
  }

  cancelDeleteAccountHandler(event: boolean) {
    this.isDeleteAccount = event;
  }

  handleCompletedOrders() {
    this.isCompletedAction = true;
    this.isCancelledAction = false;
    this.isToRecieveAction = false;
  }

  handleToRecieveOrders() {
    this.isToRecieveAction = true;
    this.isCompletedAction = false;
    this.isCancelledAction = false;
  }

  handleCancelledOrders() {
    this.isCancelledAction = true;
    this.isToRecieveAction = false;
    this.isCompletedAction = false;
  }

  handleAccountProfile() {
    this.isAccountProfile = true;
    this.isTransactions = false;
  }

  handleAccountOrders() {
    this.isTransactions = true;
    this.isAccountProfile = false;
    this.isCompletedAction = false;
    this.isCancelledAction = false;
    this.isToRecieveAction = false;
  }
}
