import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
  Event as RouterEvent,
  NavigationCancel,
} from '@angular/router';
import {
  MenuController,
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
import { addIcons } from 'ionicons';
import {
  menu,
  home,
  settings,
  logOut,
  list,
  apps,
  people,
  business,
  cube,
  add,
  refresh,
  create,
  trash,
  heart,
  close,
  closeCircleOutline,
  rocketOutline,
  eyeOutline,
  shieldCheckmarkOutline,
  bulbOutline,
  peopleOutline,
  trophyOutline,
  arrowForwardOutline,
  constructOutline,
  flashOutline,
  leafOutline,
  hardwareChipOutline,
  thumbsUpOutline,
  calculatorOutline,
} from 'ionicons/icons';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LoaderService } from './core/services/loader.service';

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
    NzGridModule,
  ],
  providers: [provideAnimations()],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  menuCtrl = inject(MenuController);
  catalogCount = signal(0);
  appVersion = '1.0.0';

  constructor() {
    this.addIconsItems();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }
    });
  }

  protected addIconsItems() {
    addIcons({
      apps,
      menu,
      home,
      settings,
      logOut,
      list,
      people,
      business,
      cube,
      add,
      refresh,
      create,
      trash,
      heart,
      close,
      closeCircleOutline,
      rocketOutline,
      eyeOutline,
      shieldCheckmarkOutline,
      bulbOutline,
      peopleOutline,
      trophyOutline,
      arrowForwardOutline,
      constructOutline,
      flashOutline,
      leafOutline,
      hardwareChipOutline,
      thumbsUpOutline,
      calculatorOutline,
    });
  }

  async logout() {
    await this.menuCtrl.close();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
