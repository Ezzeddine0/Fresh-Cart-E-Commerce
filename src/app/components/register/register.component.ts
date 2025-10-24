import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { error, log } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  errorMessage: string = '';
  successMessage: boolean = false;
  isLoading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] }
  );
  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(12),
  //     ]),
  //     email: new FormControl(null, [Validators.email, Validators.required]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [Validators.required]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSub!: Subscription;
  registerSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.registerSub = this._AuthService
        .setRegisterForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              this.successMessage = true;
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 2000);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = err.error.message;
            this.isLoading = false;
            console.log(this.errorMessage);
          },
        });
      console.log(this.registerForm);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.registerSub?.unsubscribe();
  }
}
