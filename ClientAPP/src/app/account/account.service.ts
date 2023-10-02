import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  baseUrl = environment.apiUrl;
  private CurrentUserSource = new BehaviorSubject<User | null>(null);
  CurrentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


  login(values: any) {

    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map(user => {

        localStorage.setItem('token', user.token);
        this.CurrentUserSource.next(user);
      })
    );
  }

  loadCurrentUser(token :string){

    let headers = new HttpHeaders();
    headers= headers.set('Authorization',`Bearer ${token}`); 
    return this.http.get<User>(this.baseUrl + 'account', {headers}).pipe(
      map(user => {

        localStorage.setItem('token', user.token);
        this.CurrentUserSource.next(user);
      })
    );
  }

  register(values: any) {

    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map(user => {

        localStorage.setItem('token', user.token);
        this.CurrentUserSource.next(user);
      })
    )
  }


  logout() {

    localStorage.removeItem('token');
    this.CurrentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }
}
