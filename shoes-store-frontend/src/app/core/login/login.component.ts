import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showLoginModal: boolean = false;

  constructor(private eRef: ElementRef) {}

  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() openRegisterEvent = new EventEmitter<boolean>();

  hideLoginModal() {
    this.closeLoginEvent.emit(this.showLoginModal);
  }

  showRegistersModal() {
    this.openRegisterEvent.emit(this.showLoginModal);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.closeLoginEvent.emit(this.showLoginModal);
    }
  }
}
