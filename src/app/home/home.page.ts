import { Component, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonIcon,
  IonCardTitle,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonIcon,
    IonContent,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    RouterModule,
  ],
})
export class HomePage {
  private authService = inject(AuthService);
  constructor(private menuCtrl: MenuController) {
    this.openMenu();
  }

  openMenu() {
    this.menuCtrl.open('start');
  }

  logout() {
    this.authService.logout();
  }
}
