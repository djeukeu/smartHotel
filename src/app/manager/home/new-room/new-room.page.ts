import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Room } from '../room-detail/room.model';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {

  form: FormGroup;
  addRoom: Room;
  value = firebase.database();

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      size: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(250)]
      }),
      image: new FormControl('assets/images/makepe-palace.jpg', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateRoom() {
    if (!this.form.valid) {
      return;
    }
    this.alertCtrl.create({
      header: 'Add room ?',
      message: 'Do you agree to add the room details?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Adding...',
              keyboardClose: true,
            }).then(loading => {
              loading.present();
              this.value.ref('room').push({
                description: this.form.value.description,
                type: this.form.value.type,
                size: this.form.value.size,
                status: this.form.value.status,
                roomNumber: this.form.value.number,
                image: this.form.value.image
              });
              setTimeout(() => {
                loading.dismiss();
                this.alertCtrl.create({
                  message: 'Room added!',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/home']);
                    }
                  }]
                }).then(load => {
                  load.present();
                });
              }, 2000);
            });
          }
        }
      ]
    }).then(load => {
      load.present();
    });
  }

}
