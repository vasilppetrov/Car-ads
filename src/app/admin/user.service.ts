import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { AdList } from '../car-ad/models/ad-list.model';
import { UserModel } from '../admin/models/user.model';

const baseUrl = 'https://car-app-d908c.firebaseio.com/';
const carAdsUrl = baseUrl + 'car-ads/';
const usersUrl = baseUrl + 'user-profile/';
// 'https://car-app-d908c.firebaseio.com/user-profile.json'

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getAllUsers() {
        return this.http.get<UserModel[]>(`${usersUrl}`).pipe(map((res: Response) => {
            const ids = Object.keys(res);
            const users: UserModel[] = [];
            for (const i of ids) {
                users.push(new UserModel(res[i].email, i, res[i].uid));
            }
            return users;
        }));
    }


    deleteUser(userId: string) {
        return this.http.delete(`${usersUrl}${userId}`);
    }

}



