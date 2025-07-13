import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '@app/common/services/users.service';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonText,
  IonFooter,
  IonSpinner,
} from '@ionic/angular/standalone';
import { debounceTime, finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSpinner,
    IonFooter,
    IonText,
    IonNote,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
  ],
})
export class EditComponent implements OnInit, OnDestroy {
  @Input() userId!: number;
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private destroyed = new Subject<boolean>();
  userForm!: FormGroup;
  isLoading = false;

  get firstName() {
    return this.userForm.get('first_name');
  }
  get middleName() {
    return this.userForm.get('middle_name');
  }
  get paternalSurname() {
    return this.userForm.get('last_name');
  }
  get maternalSurname() {
    return this.userForm.get('second_last_name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }

  ngOnInit() {
    this.initForm();
    if (this.userId) {
      this.getUserData(this.userId);
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: ['', [Validators.required]],
      second_last_name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  protected getUserData(userId: number) {
    this.usersService
      .getUser(userId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(user => {
        this.userForm.patchValue(user);
      });
  }

  async cancel() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async submit() {
    if (this.userForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.usersService
      .editUser(this.userForm.value, this.userId)
      .pipe(
        debounceTime(1500),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroyed)
      )
      .subscribe({
        next: response => {
          this.modalCtrl.dismiss({ ...response, success: true }, 'confirm');
        },
      });
  }
}
