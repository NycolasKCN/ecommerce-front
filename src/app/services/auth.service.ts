import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Customer } from '../common/object/customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/v1/api/auth';

  private apiKeySubject: Subject<string> = new BehaviorSubject<string>('');
  private isAuthenticatedSubject: Subject<boolean> =
    new BehaviorSubject<boolean>(false);
  private customerSubjetc: Subject<Customer | null> =
    new BehaviorSubject<Customer | null>(null);

  public isAuthenticated$: Observable<boolean>;
  public apiKey$: Observable<string>;
  public customer$: Observable<Customer | null>;

  storage: Storage = window.sessionStorage;

  constructor(private http: HttpClient, private router: Router) {
    this.checkStorage();

    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.apiKey$ = this.apiKeySubject.asObservable();
    this.customer$ = this.customerSubjetc.asObservable();
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<PostResponseAuthenticate> {
    const url: string = `${this.apiUrl}/authenticate`;
    return this.http.post<PostResponseAuthenticate>(url, credentials).pipe(
      tap((response) => {
        if (response.apiKey) {
          this.storage.setItem('api_key', response.apiKey);
          this.storage.setItem('customer', JSON.stringify(response.customer));
          this.storage.setItem('isAuthenticated', 'true');

          this.apiKeySubject.next(response.apiKey);
          this.isAuthenticatedSubject.next(true);
          this.customerSubjetc.next(response.customer as Customer);

          console.log('response: ' + response);
          console.log('api key: ' + this.apiKey$);
          console.log('isAuthenticated: ' + this.isAuthenticated$);
        }
      })
    );
  }

  register(registerRequestData: {
    firstName: any;
    lastName: any;
    email: any;
    password: any;
  }): Observable<PostResponseRegister> {
    return this.http.post<PostResponseRegister>(
      'http://localhost:8080/v1/api/customer/register',
      registerRequestData
    );
  }

  logout() {
    this.storage.removeItem('api_key');
    this.storage.removeItem('customer');
    this.storage.removeItem('isAuthenticated');

    this.isAuthenticatedSubject.next(false);
    this.customerSubjetc.next(null);
    this.apiKeySubject.next('');

    this.router.navigate(['/login']);
  }

  checkStorage() {
    if (this.storage.getItem('api_key')) {
      this.apiKeySubject.next(this.storage.getItem('api_key')!);
      this.isAuthenticatedSubject.next(true);
    }
    if (this.storage.getItem('customer')) {
      this.customerSubjetc.next(
        JSON.parse(this.storage.getItem('customer')!) as Customer
      );
    }
  }
}

interface PostResponseAuthenticate {
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  apiKey: string;
}

interface PostResponseRegister {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
