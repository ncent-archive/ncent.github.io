import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

 
    login(email: string, password: string): Observable<boolean> {
        let serverUrl = window.location.origin;
        if (serverUrl.indexOf('localhost:') > -1) {
            serverUrl = 'http://localhost';
        }
        return this.http.post(serverUrl + ':5000/api/user/login', { email, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                console.log('USER', user);

                if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('token', JSON.stringify(user.token));
                  localStorage.setItem('user', JSON.stringify(user));
                } else {
                  localStorage.setItem('token', null);
                  localStorage.setItem('user', null);
                }

                return user;
            });
    }

    signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
        let serverUrl = window.location.origin;
        if (serverUrl.indexOf('localhost:') > -1) {
            serverUrl = 'http://localhost';
        }
        return this.http.post(serverUrl + ':5000/api/user/signup', { firstName, lastName, email, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log('signup: ', user);

                if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('token', JSON.stringify(user.token));
                  localStorage.setItem('user', JSON.stringify(user));
                } else {
                  localStorage.setItem('token', null);
                  localStorage.setItem('user', null);
                }

                return user;
            });
    }
 
    logout(): Observable<boolean> {
        console.log('Login Service Logout');
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Observable.of(true);
    }

}
