import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isPublicAuthRoute(url: string): boolean {
    return url.includes('/auth/login') || url.includes('/auth/register');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');
    const isDisallowedRoute = this.isPublicAuthRoute(request.url);

    if (token && !isDisallowedRoute) {
      console.log(isDisallowedRoute);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
