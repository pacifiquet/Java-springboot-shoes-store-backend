import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchConfirmPassword } from '../validators/MatchConfirmPassword.validator';
import { PasswordChangeRequest } from '../dto/user/password-change-request';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  form: any;
  errorMessage: string = '';
  isUpdate: boolean = false;

  @Output() passwordUpdateEvent = new EventEmitter();
  @Output() successMessageEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: MatchConfirmPassword.matchingPasswordConfirm(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
  }

  get fc() {
    return this.form.controls;
  }

  cancelUpdate() {
    this.passwordUpdateEvent.emit(this.isUpdate);
  }

  onSubmit() {
    const passwordChangeRequest = new PasswordChangeRequest(
      this.form.get('oldPassword').value,
      this.form.get('newPassword').value
    );

    this.userService.changePassword(passwordChangeRequest).subscribe(
      (response) => {
        if (response.error) {
          this.errorMessage = response.error;
          console.log(response.error);
          this.passwordUpdateEvent.emit(!this.isUpdate);
        }

        if (response.success) {
          this.errorMessage = response.success;
          console.log(response.success);
          this.successMessageEvent.emit(response.success);
          this.passwordUpdateEvent.emit(this.isUpdate);
        }
      },
      (error) => {
        if (error) {
          this.errorMessage = 'Failed to chnage password';
        }
      }
    );
  }
}
