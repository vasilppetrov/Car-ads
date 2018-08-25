import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdList } from './models/ad-list.model';
import { AuthService } from '../auth/auth-service';
import { AdCreate } from './models/ad-create.model';
import * as firebase from 'firebase';

const baseUrl = 'https://car-app-d908c.firebaseio.com/';
const carAdsUrl = baseUrl + 'car-ads/';
const usersUrl = baseUrl + 'users/';
const urlTest = baseUrl + 'car-ads.json?orderBy="$value"&startAt=userUID=pretty';
// 'https://dinosaur-facts.firebaseio.com/dinosaurs.json?orderBy="$key"&startAt="a"&endAt="m"&print=pretty'
@Injectable({
    providedIn: 'root'
})

export class AdService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getAllUsers() {
        return this.http.get<AdList[]>(`${usersUrl}`);
    }

    getAllads() {
        return this.http.get<AdList[]>(`${carAdsUrl}`).pipe(map((res: Response) => {
            const ids = Object.keys(res);
            const ads: AdList[] = [];
            for (const i of ids) {
                ads.push(new AdList(i, res[i].name,
                    res[i].imagePath, res[i].description, res[i].fuel, res[i].userUID, res[i].price));
            }

            return ads;
        }));
    }

    getUserAds(key: string, value: string) {
        if (!value) {
            return;
        }

        const arr = [];
        const myref = firebase.database().ref('car-ads');
        const query = myref.orderByChild(key).equalTo(value);
        console.log(query);
        query.once('value', function (snapshot) {

            snapshot.forEach(function (child) {
                const ad = child.val();
                ad.id = child.key;
                arr.push(ad);
            });
        });
        return arr;
    }

    getAdById(adId: string) {
        return this.http.get<AdList[]>(`${carAdsUrl}${adId}`);
    }

    createAd(body: AdCreate) {
        return this.http.post(`${carAdsUrl}`, body);
    }

    editAd(body) {
        return this.http.patch(`${carAdsUrl}`, body);
    }

    deleteAd(adId: string) {
        return this.http.delete(`${carAdsUrl}${adId}`);
    }

}



