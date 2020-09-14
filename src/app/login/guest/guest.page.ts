import { Component, OnInit } from '@angular/core';
import { GuestAuthService } from './guest-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  constructor(private guestAuth: GuestAuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loadingCtrl.create({
      message: 'Loading...',
      keyboardClose: true,
    }).then(loading => {
      loading.present();
      setTimeout(() => {
        const name = form.value.guestName;
        const num = form.value.roomNumber;
        const password = +form.value.password;
        this.guestAuth.login(name, num, password);
        loading.dismiss();
      }, 2000);
    });
  }

}
