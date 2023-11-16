import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetRequest } from 'src/app/dto/user/password-reset-request';
import { UserService } from 'src/app/services/user/user.service';
import { MatchConfirmPassword } from 'src/app/validators/MatchConfirmPassword.validator';

@Component({
  selector: 'app-password-reset-save',
  templateUrl: './password-reset-save.component.html',
  styleUrls: ['./password-reset-save.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetSaveComponent {
  form: any;
  message: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  requestNewToken: boolean = false;

  hideRequestNewTokenFrom: boolean = false;

  @Output() requestNewTokenFormEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MatchConfirmPassword.matchingPasswordConfirm(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get fc() {
    return this.form.controls;
  }

  hideResetEvent(event: boolean) {
    this.requestNewToken = false;
  }

  requestNewTokenHandler() {
    this.requestNewToken = true;
    this.requestNewTokenFormEvent.emit(this.hideRequestNewTokenFrom);
  }

  onSubmit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const passwordRequest = new PasswordResetRequest(
      this.form.get('password').value
    );
    if (token) {
      this.userService.saveResetPassword(token, passwordRequest).subscribe(
        (response) => {
          if (response.success) {
            this.message = response.success;
            setTimeout(() => {
              this.isSuccess = true;
              this.router.navigate(['/home']);
            }, 3000);
          }

          if (response.error) {
            this.message = response.error;
            if (response.error.startsWith('invalid')) {
              this.isError = true;
            }
          }
        },
        (error) => {
          if (error) {
            this.message = error?.error.message;
            this.isError = true;
          }
        }
      );
    }
  }
}
