import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountVerificationComponent {
  VerifyMessage: string = 'account verification';
  isVerified: boolean = false;
  requestNewToken: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      userService.verifyNewAccount(token).subscribe((response) => {
        if (response.success || response.verified) {
          this.VerifyMessage = response.success;
          this.isVerified = true;
          setTimeout(() => {
            router.navigate(['/home']);
          }, 4000);
        }

        if (response.error) {
          this.VerifyMessage = response.error;
          this.requestNewToken = true;
          console.log(response.error);
        }
      });
    }
  }

  requestNewTokenHandler() {
    const oldToken = this.route.snapshot.queryParamMap.get('token');
    if (oldToken) {
      this.userService.requestNewToken(oldToken).subscribe((response) => {
        if (response.token) {
          this.VerifyMessage = response.token;
          this.isVerified = true;
          this.requestNewToken = false;
          setTimeout(() => {
            this.isVerified = false;
            setTimeout(() => {
              this.router.navigate(['/home']);
            });
          }, 4000);
        }
        if (response.error) {
          this.VerifyMessage = response.error;
          this.isVerified = false;
          this.requestNewToken = false;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 4000);
        }
      });
    }
  }
}
