import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordChangeRequest } from 'src/app/dto/user/password-change-request';
import { UserService } from 'src/app/services/user/user.service';
import { MatchConfirmPassword } from 'src/app/validators/MatchConfirmPassword.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
