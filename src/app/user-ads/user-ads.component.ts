import { Component, OnInit } from '@angular/core';
import { AdService } from '../car-ad/ad.service';
import { AuthService } from '../auth/auth-service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.css']
})
export class UserAdsComponent implements OnInit {
  userAds;
  userUID;
  showtext = { v: false };
  constructor(private adService: AdService, private authService: AuthService, private toastr: ToastrService) {
    this.userAds = [];
  }

  ngOnInit() {
    console.log(this.userAds);
    this.userUID = this.authService.getUserUID();

    this.userAds = this.adService.getUserAds('userUID', this.userUID);
  }

  deleteAd(adId: string) {
    this.adService.deleteAd(adId).subscribe(() => {
      this.userAds = this.adService.getUserAds('userUID', this.userUID);
      this.toastr.success('Ad Deleted!', 'Success!', {
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    });
  }

}
