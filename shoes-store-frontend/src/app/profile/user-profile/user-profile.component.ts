import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {LoginUserResponse} from 'src/app/dto/user/login-user-response';
import {UserResponse} from 'src/app/dto/user/user-response';
import {UserUpdateRequest} from 'src/app/dto/user/user-update';
import {AuthenticationService} from 'src/app/services/user/authentication.service';
import {NoSpace} from 'src/app/validators/NoSpace.validator';
import {UserUpdateInterface} from '../types/userUpdate.interface';
import {
  deleteUserActions,
  updateUserActions,
  userProfileActions,
} from '../store/actions';
import {
  selectIsProfileLoaded,
  selectIsUpdated,
  selectProfileError,
  selectUserProfile,
  selectIsDeleting,
} from '../../app.reducer';

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
  successMessage: string = 'successfully Updated';
  isSuccessMessage: boolean = false;
  updateUserForm: any;
  userProfileImage: any;
  fileMessage: string = '';
  isWrongFile: boolean = false;
  loggedUser: LoginUserResponse = new LoginUserResponse();
  userProfile: UserResponse = new UserResponse();
  unsubscribe$ = new Subject<void>();

  userProfile$ = combineLatest({
    isLoggedIn: this.store.select(selectIsProfileLoaded),
    profile: this.store.select(selectUserProfile),
    profileError: this.store.select(selectProfileError),
    isUpdated: this.store.select(selectIsUpdated),
    isDeleting: this.store.select(selectIsDeleting),
  });

  @Input() deleteMessage: string =
    'did you request to delete your account? your acount is deleted parmanently';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
      lastName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
      address: ['', Validators.required],
    });
    this.store.dispatch(userProfileActions.userProfile());
  }

  ngOnInit(): void {}

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

  onSaveUpdate(id: any) {
    const userInfo = new UserUpdateRequest(
      this.updateUserForm.get('firstName')?.value,
      this.updateUserForm.get('lastName')?.value,
      this.updateUserForm.get('address')?.value
    );

    const updateRequest: UserUpdateInterface = {
      userInfo: userInfo,
      profile: this.userProfileImage,
    };

    this.store.dispatch(
      updateUserActions.updateUser({
        request: updateRequest,
        id: id,
      })
    );

    this.isUpdateAccount = false;
  }

  updateAccount() {
    this.isUpdateAccount = true;
    this.userProfile$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({profile}) => {
        this.updateUserForm.setValue({
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          address: profile?.address,
        });
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

  deleteAccountHandler(id: any) {
    this.store.dispatch(deleteUserActions.deleteUser({id}));
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
