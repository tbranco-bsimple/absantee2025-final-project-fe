import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    url = 'http://localhost:5073/api/users';

    async getUsers(): Promise<User[]> {
        const data = await fetch(this.url);
        return (await data.json()) ?? [];
    }

    async getUserById(id: number): Promise<User | undefined> {
        const data = await fetch(`${this.url}?id=${id}`);
        const locationJson = await data.json();
        return locationJson[0] ?? {};
    }

}
