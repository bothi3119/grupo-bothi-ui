import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonApp,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.page.html',
  styleUrls: ['./administration-layout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonContent,
    IonBackButton,
    IonButtons,
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    RouterModule,
    RouterModule,
    IonMenuButton,
  ],
})
export class AdministrationLayoutPage {
  private router = inject(Router);
  private location = inject(Location);
  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
