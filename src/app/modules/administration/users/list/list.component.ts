import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@app/common/interfaces/user.interface';
import { UsersService } from '@app/common/services/users.service';
import { debounceTime, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BaseTableComponent } from '@app/common/classes/base-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { CreateComponent } from '../create/create.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    CommonModule,
    RouterModule,
    NzTableModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTagModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzSwitchModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ListComponent extends BaseTableComponent<User> implements OnInit, OnDestroy {
  private usersService = inject(UsersService);
  private modalCtrl = inject(ModalController);
  private destroyed = new Subject<boolean>();
  users: User[] = [];
  searchControl = new FormControl('');

  ngOnInit() {
    this.loadUsers();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(text => this.usersService.loadUsers(text !== '' ? String(text) : undefined)),
        takeUntil(this.destroyed)
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  loadUsers() {
    this.usersService
      .loadUsers()
      .pipe(debounceTime(1500), takeUntil(this.destroyed))
      .subscribe(users => {
        this.users = users;
      });
  }

  getRoleBy(role: string, property: 'status' | 'name'): string {
    const statusMap: Record<string, string> = {
      super_admin: 'processing',
      admin: 'error',
      manager: 'warning',
      user: 'success',
    };
    const statusName: Record<string, string> = {
      super_admin: 'Super Administrador',
      admin: 'Administrador',
      user: 'Usuario',
    };
    return (property === 'status' ? statusMap[role] : statusName[role]) ?? '';
  }

  activeUser(value: boolean, id: number) {
    this.usersService.activeOrDeactive({ active: value }, id).pipe(takeUntil(this.destroyed)).subscribe();
  }

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: CreateComponent,
      cssClass: 'auto-height-modal',
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.success) {
        this.loadUsers();
      }
    });

    await modal.present();
  }

  async editUser(id: number) {
    const modal = await this.modalCtrl.create({
      component: EditComponent,
      cssClass: 'auto-height-modal',
      backdropDismiss: false,
      componentProps: {
        userId: id,
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.success) {
        this.loadUsers();
      }
    });

    await modal.present();
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
