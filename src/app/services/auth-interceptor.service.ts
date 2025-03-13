import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private api_token: string = '';
  private isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.apiKey$.subscribe((apiKey) => {
      this.api_token = apiKey;
    });

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const securedEndpoints = [
      'http://localhost:8080/v1/api/orders',
      'http://localhost:8080/v1/api/customer/info',
    ];

    console.log('intercepting request');

    if (
      securedEndpoints.some((url) => req.url.includes(url)) &&
      this.isAuthenticated
    ) {
      console.log('adding token to: ', req.url);
      const accessToken = this.api_token;
      console.log('Token:', accessToken);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return await lastValueFrom(next.handle(req));
  }
}
