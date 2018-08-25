import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  result;
  input;
  constructor(private adService: AdService) { }

  ngOnInit() {
  }
  search() {
    this.result = this.adService.getUserAds('name', this.input);
  }

}
