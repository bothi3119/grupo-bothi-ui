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
} from '@ionic/angular/standalone';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonTitle, IonButtons, IonToolbar, IonHeader, IonMenuButton],
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
