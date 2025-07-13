import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function errorInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toastController = inject(ToastController);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(error, toastController, router, authService);
      return throwError(() => error);
    })
  );
}

async function handleError(
  error: HttpErrorResponse,
  toastController: ToastController,
  router: Router,
  authService: AuthService
): Promise<void> {
  if (error.status === 0) {
    await showToast('Error de conexión - verifica tu internet', toastController);
    return;
  }

  const errorMessage = getErrorMessage(error);
  await showToast(errorMessage, toastController);

  if (error.status === 401) {
    authService.logout();
    router.navigate(['/login']);
  }
}

function getErrorMessage(error: HttpErrorResponse): string {
  const backendError = error.error;
  const { details, message } = error.error.error;
  if (typeof backendError === 'object' && backendError !== null) {
    return details || message || 'Error desconocido del servidor';
  }

  switch (error.status) {
    case 400:
      return 'Solicitud incorrecta';
    case 401:
      return 'No autorizado - por favor inicia sesión nuevamente';
    case 403:
      return 'Acceso denegado - no tienes permisos';
    case 404:
      return 'Recurso no encontrado';
    case 422:
      return 'Datos no válidos';
    case 500:
      return 'Error interno del servidor';
    default:
      return `Error ${error.status}`;
  }
}

async function showToast(message: string, toastController: ToastController): Promise<void> {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: 'top',
    color: 'danger',
  });
  await toast.present();
}
