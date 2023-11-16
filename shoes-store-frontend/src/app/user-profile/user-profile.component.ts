import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthenticationService } from '../services/user/authentication.service';
import { LoginUserResponse } from '../dto/user/login-user-response';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { NoSpace } from '../validators/NoSpace.validator';
import { UserService } from '../services/user/user.service';
import { UserUpdateRequest } from '../dto/user/user-update';
import { UserResponse } from '../dto/user/user-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isAccountProfile: boolean = false;
  isTransactions: boolean = true;
  isDeleteAccount: boolean = false;

  isCompletedAction: boolean = false;
  isCancelledAction: boolean = false;
  isToReceiveAction: boolean = false;

  isMarkerComplete: boolean = false;
  isMarkerCanceled: boolean = false;
  isMarkerToReceive: boolean = false;
  isCancelOrder: boolean = false;
  isUpdateAccount: boolean = false;
  isUpdatePasword: boolean = false;
  successMessage: string = 'success full changed';
  isSuccessMessage: boolean = false;
  updateUserForm: any;
  userProfileImage: any;
  fileMessage: string = '';
  isWrongFile: boolean = false;
  loggedUser: LoginUserResponse = new LoginUserResponse();
  userProfile: UserResponse = new UserResponse();
  unsubscribe$ = new Subject<void>();

  @Input() deleteMessage: string =
    'did you request to delete your account? your acount is deleted parmanently';

  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
      lastName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.auth.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.loggedUser = user;
      });

    this.userService
      .getUserById(Number(this.loggedUser.id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          if (res) {
            this.userProfile = res;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  get fc() {
    return this.updateUserForm.controls;
  }

  profileImageHandler(event: Event) {
    this.userProfileImage = (event.target as HTMLInputElement).files?.[0];
    let allImages: Array<string> = ['png', 'jpg', 'jpeg'];
    const index = this.userProfileImage.type.indexOf('/');
    let filePrefix = this.userProfileImage.type.substring(index + 1);
    if (allImages.includes(filePrefix)) {
      this.fileMessage = this.userProfileImage.name;
      this.isWrongFile = false;
    } else {
      this.isWrongFile = true;
      this.fileMessage = 'selected wrong file';
    }
  }

  onSaveUpdate() {
    const updateUser = new UserUpdateRequest(
      this.updateUserForm.get('firstName')?.value,
      this.updateUserForm.get('lastName')?.value,
      this.updateUserForm.get('address')?.value
    );
    this.userService
      .updateUser(
        this.userProfileImage,
        JSON.stringify(updateUser),
        Number(this.userProfile.id)
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          if (response) {
            this.userProfile = response;
            this.successMessage = 'successfully updated';
            this.isSuccessMessage = true;
            setTimeout(() => {
              this.isSuccessMessage = false;
            }, 3000);
          }
        },
        (error) => {
          if (error) {
            console.log(error?.error);
          }
        }
      );
    this.isUpdateAccount = false;
  }

  updateAccount() {
    this.isUpdateAccount = true;
    this.updateUserForm.setValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      address: this.userProfile.address,
    });
  }

  cancelAccountUpdate() {
    this.isUpdateAccount = false;
  }

  changeUserPassword() {
    this.isUpdatePasword = true;
  }

  changePasswordSuccess(event: string) {
    this.successMessage = event;
    this.isSuccessMessage = true;

    setTimeout(() => {
      this.isSuccessMessage = false;
      this.auth.logout();
      this.router.navigate(['/home']);
    }, 3000);
  }

  hidePasswordUpdateHandler(event: boolean) {
    this.isUpdatePasword = event;
  }

  deleteAccount() {
    this.isDeleteAccount = true;
  }

  deleteAccountHandler(event: boolean) {
    this.isDeleteAccount = event;
    this.userService
      .deleteUser(Number(this.userProfile.id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          if (res) {
            this.auth.logout();
            this.router.navigate(['/home']);
            console.log(res);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cancelDeleteAccountHandler(event: boolean) {
    this.isDeleteAccount = event;
  }

  handleCompletedOrders() {
    this.isCompletedAction = true;
    this.isCancelledAction = false;
    this.isToReceiveAction = false;
  }

  handleToReceiveOrders() {
    this.isToReceiveAction = true;
    this.isCompletedAction = false;
    this.isCancelledAction = false;
  }

  handleCancelledOrders() {
    this.isCancelledAction = true;
    this.isToReceiveAction = false;
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
    this.isToReceiveAction = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
