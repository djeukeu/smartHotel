import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuestAuthService {

  private _guestLog = false;
  password = 1234;
  name: string;
  roomNumber: number

  constructor(private router: Router, private alertCtrl: AlertController) { }

  get guestLog() {
    return this._guestLog;
  }

  get guestName(){
    return this.name;
  }

  get roomNum(){
    return this.roomNumber;
  }

  login(name: string, num: number, password: number) {
    if(password !== this.password) {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Manager authorization is not valid!',
        buttons: ['OK']
      }).then( alertCode => {
        alertCode.present();
      });
      return;
    }else{
      this.name = name;
      this.roomNumber = num;
      this._guestLog = true;
      this.router.navigateByUrl('/guest');
    }
  }

  logout() {
    this._guestLog = false;
  }

}
