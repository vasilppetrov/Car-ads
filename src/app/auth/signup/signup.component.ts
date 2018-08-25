import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';
import { AuthModel } from '../models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: AuthModel;
  constructor(private authService: AuthService) {
    this.model = new AuthModel('', '');
  }

  ngOnInit() {
  }


  signUp() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signUp(email, password);

  }
}
