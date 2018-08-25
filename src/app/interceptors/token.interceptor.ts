import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { tap } from 'rxjs/operators';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (token) {
            req = req.clone({
                url: `${req.url}.json?auth=${token}`
            });
        }
        return next.handle(req).pipe(
            tap((res: HttpEvent<any>) => {
                if (res instanceof HttpResponse && token) {
                    this.saveToken(token);
                }
            }));
    }
    private saveToken(token) {
        this.authService.setToken(token);
    }
}
