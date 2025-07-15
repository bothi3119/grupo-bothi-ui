import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '@app/auth/services/auth.service';
import { PasswordService } from '@app/core/services/passwords.service';

export function matchPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMismatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const errors: any = {};

    // Longitud
    if (value.length < 8 || value.length > 16) {
      errors.passwordLength = true;
    }

    // Mayúsculas
    if (!/[A-Z]/.test(value)) {
      errors.passwordUppercase = true;
    }

    // Minúsculas
    if (!/[a-z]/.test(value)) {
      errors.passwordLowercase = true;
    }

    // Números
    if (!/\d/.test(value)) {
      errors.passwordNumber = true;
    }

    // Caracteres especiales
    if (!/[\u0021-\u002f\u003a-\u0040\u005f]/.test(value)) {
      errors.passwordSpecialChar = true;
    }

    // Espacios
    if (/\s/.test(value)) {
      errors.passwordSpaces = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  animations: [
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class PasswordPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private passwordService = inject(PasswordService);
  isLoading = signal(false);
  error = signal('');
  loginForm: FormGroup;
  credentials = signal({
    password: '',
    password_confirmation: '',
    token: '',
  });
  showPassword = false;
  confirmPassword = false;
  @Input() logoUrl: string = '';

  constructor() {
    this.loginForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
        password_confirmation: ['', [Validators.required]],
        token: '',
      },
      { validator: matchPasswordValidator('password', 'password_confirmation') }
    );
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.loginForm.get('token')?.patchValue(params['message']);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.confirmPassword = !this.confirmPassword;
  }

  setPassword() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.credentials.set({
      password: this.loginForm.get('password')?.value ?? '',
      password_confirmation: this.loginForm.get('password_confirmation')?.value ?? '',
      token: this.loginForm.get('token')?.value ?? null,
    });
    this.isLoading.set(true);
    this.error.set('');
    this.passwordService
      .updatePasswordWithToken({
        token: this.credentials().token,
        new_password: this.credentials().password,
        new_password_confirmation: this.credentials().password_confirmation,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/home']);
        },
        error: err => {
          this.isLoading.set(false);
          this.error.set('Error al registrar contraseña. Por favor inténtalo de nuevo.');
        },
      });
  }
}
