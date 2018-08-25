import { Component, OnInit } from '@angular/core';
import { AdService } from '../car-ad/ad.service';
import { UserService } from './user.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { UserModel } from '../admin/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id: string;
  allUsers: Object;
  constructor(private adService: AdService, private userService: UserService, private toastr: ToastrService, ) { }

  ngOnInit() {
    this.adService.getAllUsers().subscribe((res) => {
    });
    this.getUsers();
  }

  deleteUser(userId: string) {
    console.log(userId);
    this.userService.deleteUser(userId)
      .subscribe(() => {
        this.toastr.success('User Deleted!', 'Success!', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.getUsers();
      });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

}
