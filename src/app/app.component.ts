import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBdJesZ47kaz14cSMe0qhdBSmr_Wf2nL60',
      authDomain: 'car-app-d908c.firebaseapp.com',
      databaseURL: 'https://car-app-d908c.firebaseio.com/',
    });
  }

}
