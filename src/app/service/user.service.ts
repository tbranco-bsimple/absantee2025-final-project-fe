import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    users: User[] = [
        {
            id: "2541a8b8-ed5e-4530-88ea-893796e60507",
            names: "Ella",
            surnames: "Orn",
            email: "Uriel_Ratke58@hotmail.com",
            periodDateTime: {
                _initDate: "2010-01-01T00:00:00.000Z",
                _finalDate: "2025-01-01T00:00:00.000Z"
            }
        },
        {
            id: "31ada466-96f5-4886-9af0-557aa7fcdbb5",
            names: "Hilma",
            surnames: "Yundt",
            email: "Rhianna_Wunsch@gmail.com",
            periodDateTime: {
                _initDate: "2012-05-13T08:54:40.000Z",
                _finalDate: "2025-05-13T08:54:40.000Z"
            }
        },
        {
            id: "4a92d674-bf09-4176-a846-2cbf0beb3774",
            names: "Misael",
            surnames: "Kuhlman",
            email: "Mortimer69@hotmail.com",
            periodDateTime: {
                _initDate: "2005-09-01T12:00:00.000Z",
                _finalDate: "2020-09-01T12:00:00.000Z"
            }
        },
        {
            id: "466ae640-b818-4540-a4d8-16cd4145daf7",
            names: "Danielle",
            surnames: "Reinger",
            email: "Herta29@yahoo.com",
            periodDateTime: {
                _initDate: "2011-11-11T11:11:11.000Z",
                _finalDate: "2025-11-11T11:11:11.000Z"
            }
        },
        {
            id: "5cddda17-1f64-4a18-87e0-28c192eac13a",
            names: "Madison",
            surnames: "Rau",
            email: "Saige.Kertzmann@gmail.com",
            periodDateTime: {
                _initDate: "2022-01-01T00:00:00.000Z",
                _finalDate: "2024-01-01T00:00:00.000Z" // período de 2 anos
            }
        },
        {
            id: "235ba33b-b290-4279-bb23-f4cabcdc12d0",
            names: "Nasir",
            surnames: "Schmidt",
            email: "Madelynn97@gmail.com",
            periodDateTime: {
                _initDate: "2013-07-01T00:00:00.000Z",
                _finalDate: "2025-07-01T00:00:00.000Z"
            }
        },
        {
            id: "b527683e-637c-4271-afcd-ef716f5c5500",
            names: "Rosamond",
            surnames: "Langworth",
            email: "Austyn9@hotmail.com",
            periodDateTime: {
                _initDate: "2000-12-31T23:59:59.000Z",
                _finalDate: "2020-12-31T23:59:59.000Z"
            }
        },
        {
            id: "3768bb27-2d5f-4ec8-a674-4485e9a9ad64",
            names: "Cedrick",
            surnames: "Schuster",
            email: "Faye_Stokes81@hotmail.com",
            periodDateTime: {
                _initDate: "2015-06-15T10:30:00.000Z",
                _finalDate: "2028-06-15T10:30:00.000Z"
            }
        }
    ];

    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}
