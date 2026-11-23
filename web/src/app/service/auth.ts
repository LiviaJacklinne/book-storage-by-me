import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient);

   login(email: string, senha: string) {
    return this.http
      .post<{ access_token: string }>('/api/auth/login', { email, senha })
      .pipe(
        tap((response) => localStorage.setItem('authToken', response.access_token)),
      );
  }

}
