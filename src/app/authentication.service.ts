import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private window: Window) { }

  authGoogle(): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer JWT-token'
  });
    this.window.location.href = 'http://localhost:3000/auth/google';

    return of(true);
  }
}
