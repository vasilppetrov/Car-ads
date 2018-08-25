import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger } from '../../../node_modules/@angular/animations';
import { observable, Observable, of } from '../../../node_modules/rxjs';


const TOASTRCONFIG = {
    positionClass: 'toast-bottom-right',
    progressBar: true,
};

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private static readonly USER_TOKEN_KEY = 'USER_TOKEN';
    private static readonly USER_ID_KEY = 'USER_ID';
    private static readonly IS_ADMIN_KEY = 'IS_ADMIN';
    token: string;
    userUID: string;
    isAdmin: boolean;

    constructor(private tostr: ToastrService, private router: Router, private http: HttpClient) {
    }

    signUp(email: string, password: string) {
        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const user = {
                    uid: res.user.uid,
                    email: email
                };
                this.http.post('https://car-app-d908c.firebaseio.com/user-profile.json', user).subscribe();
            })
            .then(() => {
                this.tostr.success('Signed Up', 'Success', TOASTRCONFIG);
                this.router.navigate(['/auth/signin']);

            })
            .catch((err) => {
                this.tostr.error(err.message, 'Warning', TOASTRCONFIG);
            });
    }

    signIn(email: string, password: string) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.setUID(firebase.auth().currentUser.uid))
            .then(() => firebase.auth().currentUser.getIdToken())
            .then((token: string) => this.setToken(token))
            .then(() => {
                this.http.get('https://car-app-d908c.firebaseio.com/users').subscribe(users => {
                    const ownUser = users[this.getUserUID()];
                    this.setIsAdmin(ownUser && ownUser.role === 'admin');
                });
            })
            .then(() => {
                this.http.get('https://car-app-d908c.firebaseio.com/user-profile').subscribe(data => {
                    let exist = false;
                    const obs = new Observable();
                    for (const user in data) {
                        if (data.hasOwnProperty(user)) {
                            console.log(this.getUserUID() === data[user].uid);
                            const uid = data[user].uid;
                            if (this.getUserUID() === uid || this.getIsAdmin()) {
                                exist = true;
                            }
                        }
                    }
                    if (!exist) {
                        return of(exist).subscribe(() => {
                            this.logOut().then(() => {
                                localStorage.clear();
                                this.tostr.error('Your acc have been Deleted', 'Warning', TOASTRCONFIG);
                            });
                        });
                    } else {
                        this.tostr.success('Signed In', 'Success', TOASTRCONFIG);
                        this.router.navigate(['/car-ad/list']);
                    }
                });
            }).catch((err) => { this.tostr.error(err.message, 'Warning', TOASTRCONFIG); });
        // .then(() => {
        //     if (localStorage.getItem(AuthService.USER_TOKEN_KEY)) {
        //         this.tostr.success('Signed In', 'Success', TOASTRCONFIG);
        //         this.router.navigate(['/car-ad/list']);
        //     }
        // })
        // .catch((err) => {
        //     this.tostr.error(err.message, 'Warning', TOASTRCONFIG);
        // });
    }

    logOut() {
        return firebase.auth().signOut()
            .then(() => {
                this.removeUID();
                this.removeIsAdmin();
                this.removeToken();
                this.router.navigate(['/auth/signin']);
            });
    }

    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem(AuthService.USER_TOKEN_KEY);
        }

        return this.token;
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem(AuthService.USER_TOKEN_KEY, token);
    }

    removeToken() {
        localStorage.removeItem(AuthService.USER_TOKEN_KEY);
        this.token = null;

    }

    getUserUID() {
        if (!this.userUID) {
            this.userUID = localStorage.getItem(AuthService.USER_ID_KEY);
        }

        return this.userUID;
    }

    setUID(uid: string) {
        this.userUID = uid;
        localStorage.setItem(AuthService.USER_ID_KEY, uid);
    }

    removeUID() {
        this.userUID = null;
        localStorage.removeItem(AuthService.USER_ID_KEY);
    }

    getIsAdmin() {
        if (!this.isAdmin) {
            this.isAdmin = JSON.parse(localStorage.getItem(AuthService.IS_ADMIN_KEY));
        }

        return this.isAdmin;
    }

    setIsAdmin(isAdmin: boolean) {
        this.isAdmin = !!isAdmin;
        localStorage.setItem(AuthService.IS_ADMIN_KEY, JSON.stringify(!!isAdmin));
    }

    removeIsAdmin() {
        this.isAdmin = null;
        localStorage.removeItem(AuthService.IS_ADMIN_KEY);
    }

    isAuthenticated() {
        return !!this.getToken();
    }

}
