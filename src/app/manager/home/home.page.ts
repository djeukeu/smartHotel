import { Component, OnInit } from '@angular/core';
import { Room } from './room-detail/room.model';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  rooms: Room[];

  constructor() {}

  ngOnInit() {
    // this.fetchData();
  }
  ionViewWillEnter() {
    this.fetchData();
  }

  fetchData() {
    this.rooms = [];
    const value = firebase.database().ref('room').on('value', data => {
      // tslint:disable-next-line: forin
      for (const key in data.val()) {
        this.rooms.push({ ...data.val()[key], id: key });
      }
    });
  }

}
