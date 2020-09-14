import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthService {

  private _managerLog = false;
  // private _managerLog = true;

  constructor(private router: Router, private alertCtrl: AlertController) { }

  get managerLog() {
    return this._managerLog;
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(log => {
      this._managerLog = true;
      this.router.navigateByUrl('/manager');
    })
    .catch( async error => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/invalid-email':
             errorMessage = 'Wrong Email!';
             break;
          case 'auth/user-disabled':
             errorMessage = 'User do not have access!';
             break;
          case 'auth/user-not-found':
             errorMessage = 'User not found!';
             break;
          case 'auth/wrong-password':
             errorMessage = 'Wrong Password!';
             break;
          default:
            errorMessage = 'Cannot login! Try later!'
            break;
        }
        const alertCode = await this.alertCtrl.create({
          header: 'Error',
          message: errorMessage,
          buttons: ['OK']
        });
        await alertCode.present();
    });
  }

  logout() {
    firebase.auth().signOut();
    this._managerLog = false;
  }
}
