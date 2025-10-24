import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  msgSuccess: boolean = false;
  errorMessage = '';
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  loginSub!: Subscription;
  loginSubmit() {
    this.isLoading = true;
    this.loginSub = this._AuthService
      .setloginForm(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.msgSuccess = true;
          this.errorMessage = '';
          console.log(res);
          if (res.message == 'success') {
            setTimeout(() => {
              // 1- save token
              localStorage.setItem('userToken', res.token);
              // 2- Decode token
              this._AuthService.saveUserData();
              // 3- navigate to home
              this._Router.navigate(['/home']);
            }, 2000);
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMessage = err.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
