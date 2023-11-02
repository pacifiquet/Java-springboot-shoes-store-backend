import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notificationOpen: boolean = true;

  @Output() notificationEvent = new EventEmitter<boolean>();

  hideNotifications() {
    this.notificationEvent.emit(!this.notificationOpen);
  }
}
