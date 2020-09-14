import { Component, OnInit } from '@angular/core';
import { ManagerAuthService } from './manager-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(private managerAuth: ManagerAuthService, private loadingCtrl: LoadingController) { }
  

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loadingCtrl.create({
      message: 'Loading...',
      keyboardClose: true,
    }).then( loading => {
      loading.present();
      setTimeout(() => {
        const email = form.value.email;
        const password = form.value.password;
        this.managerAuth.login(email, password);
        loading.dismiss();
      }, 2000);
    });
  }


}
