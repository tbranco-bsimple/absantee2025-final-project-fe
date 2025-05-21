import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {

    url = 'http://localhost:5073/api/users';

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.url);
    }

    getUserById(id: number): Observable<User> {
        return this.httpClient.get<User>(this.url + id);
    }
}
