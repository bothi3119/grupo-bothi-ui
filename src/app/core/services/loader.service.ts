import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private loadingCtrl: LoadingController) {}

  async show(message?: string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: message ? message : 'Cargando..',
      duration: 200,
    });

    loading.present();
  }
}
