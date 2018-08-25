import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdList } from '../models/ad-list.model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {
  id: string;
  adToEdit: AdList[];
  isCreator: boolean;
  constructor(private adService: AdService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.adService.getAdById(this.id)
      .subscribe((res) => {
        this.adToEdit = res;
      });


  }
  editAd() {
    const body = {
      [this.id]: this.adToEdit
    };

    this.adService.editAd(body)
      .subscribe((data) => {
        this.toastr.success('Ad Edited!', 'Success!', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.router.navigate(['car-ad/list']);
      });
  }
}
