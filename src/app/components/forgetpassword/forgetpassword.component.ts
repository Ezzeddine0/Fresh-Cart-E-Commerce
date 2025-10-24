import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent implements OnDestroy {
  _AuthService = inject(AuthService);
  _FormBuilder = inject(FormBuilder);
  _Router = inject(Router);
  isLoading = false;
  errorMessage: string = '';
  success: boolean = false;
  //
  forgetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
  });

  resetCodeVerifyForm: FormGroup = this._FormBuilder.group({
    resetCode: [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  //

  forgetPasswordSub!: Subscription;
  forgetPassword() {
    if (this.forgetPasswordForm.valid) {
      let userEmail = this.forgetPasswordForm.value.email;
      this.resetPasswordForm.get('email')?.patchValue(userEmail);
      this.errorMessage = '';
      this.isLoading = true;
      this.forgetPasswordSub = this._AuthService
        .forgetPsssword(this.forgetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.errorMessage = '';
            res.data;
            document.getElementById('forgetPassword')?.classList.add('d-none');
            document
              .getElementById('verifyResetCode')
              ?.classList.remove('d-none');
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error.message;
            console.log(err);
          },
        });
    }
  }

  resetCodeSub!: Subscription;
  resetCode() {
    console.log(this.resetCodeVerifyForm.value);
    if (this.resetCodeVerifyForm.valid) {
      this.isLoading = true;
      this.resetCodeSub = this._AuthService
        .verifyResetCode(this.resetCodeVerifyForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.errorMessage = '';
            console.log(res);
            document.getElementById('verifyResetCode')?.classList.add('d-none');
            document
              .getElementById('resetPassword')
              ?.classList.remove('d-none');
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            this.errorMessage = err.error.message;
          },
        });
    }
  }

  resetPasswordSub!: Subscription;
  resetPassword() {
    console.log(this.resetPasswordForm);
    this.isLoading = true;
    this.resetPasswordSub = this._AuthService
      .ResetPassword(this.resetPasswordForm.value)
      .subscribe({
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          setTimeout(() => {
            this._Router.navigate(['login']);
          }, 2000);
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.errorMessage = err.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.forgetPasswordSub.unsubscribe();
    this.resetCodeSub.unsubscribe();
    this.resetPasswordSub.unsubscribe();
  }
}
