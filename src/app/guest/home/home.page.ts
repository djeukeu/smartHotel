import { Component, OnInit } from '@angular/core';
import { GuestAuthService } from 'src/app/login/guest/guest-auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dnd = false;
  cleanup = false;
  alert = false;
  light = 'off';
  name: string;
  number: number;

  constructor(private guestAuth: GuestAuthService, private navCtrl: NavController) { }

  ngOnInit() {
    this.name = this.guestAuth.guestName;
    this.number = this.guestAuth.roomNum;
  }

  doNotDisturb() {
    this.dnd = !this.dnd;
  }
  cleanUp() {
    this.cleanup = !this.cleanup;
  }
  emergency() {
    this.alert = !this.alert;
  }
  lightScenes(light: string) {
    this.light = light;
  }

  onLogout(){
    this.guestAuth.logout();
    this.navCtrl.navigateRoot('/login/guest');
  }

}
