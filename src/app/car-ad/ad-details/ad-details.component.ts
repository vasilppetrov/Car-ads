import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdList } from '../models/ad-list.model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  id: string;
  currentAd: AdList[];
  userUID: string;
  isAdmin: boolean;
  constructor(private adService: AdService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userUID = this.authService.getUserUID();
    this.isAdmin = this.authService.getIsAdmin();
    this.adService.getAdById(this.id)
      .subscribe((res) => {
        this.currentAd = res;

      });
  }

  deleteAd() {
    this.adService.deleteAd(this.id)
      .subscribe((data) => {
        this.toastr.success('Ad Deleted!', 'Success!', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.router.navigate(['/car-ad/list']);
      });
  }

}
