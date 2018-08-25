import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';
import { AdList } from '../models/ad-list.model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  adsList: Object;
  userUID: string;
  isAdmin: boolean;
  constructor(private adService: AdService, private authService: AuthService) {
  }

  ngOnInit() {

    this.adService.getAllads().subscribe((data) => {
      this.adsList = data;
      this.userUID = this.authService.getUserUID();
      this.isAdmin = this.authService.getIsAdmin();

    });
  }
}
