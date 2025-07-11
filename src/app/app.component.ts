import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MenuController,
  Platform,
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
  IonList,
  IonLabel,
  IonItemDivider,
  IonItem,
  IonText,
  IonMenu,
  IonBadge,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonText,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonContent,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    IonApp,
    IonRouterOutlet,
    RouterModule,
    IonMenu,
  ],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private menuCtrl = inject(MenuController);
  private platform = inject(Platform);

  catalogCount = signal(0);
  appVersion = '1.0.0';

  constructor() {
    this.platform.ready().then(() => {
      console.log('soy app component');
    });
  }

  async logout() {
    await this.menuCtrl.close();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
