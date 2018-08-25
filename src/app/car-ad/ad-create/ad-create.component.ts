import { Component, OnInit } from '@angular/core';
import { AdCreate } from '../models/ad-create.model';
import { AdService } from '../ad.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  bindingModel: AdCreate;
  userId: string;

  constructor(private adService: AdService, private toastr: ToastrService, private router: Router, private auth: AuthService) {
    this.userId = this.auth.getUserUID();
    this.bindingModel = new AdCreate('', '', '', this.userId, '', null);
  }

  ngOnInit() {

  }
  create() {
    this.adService.createAd(this.bindingModel)
      .subscribe(() => {
        this.toastr.success('New Ad Created', 'Success', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.router.navigate(['car-ad/list']);
      });
  }
}
