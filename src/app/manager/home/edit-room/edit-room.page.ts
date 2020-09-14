import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../room-detail/room.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.page.html',
  styleUrls: ['./edit-room.page.scss'],
})
export class EditRoomPage implements OnInit {

  form: FormGroup;
  editRoom: Room;
  value = firebase.database();

  constructor(private activatedRoute: ActivatedRoute, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('roomId')) {
        // redirect
        return;
      }
      const roomId = paramMap.get('roomId');
      this.value.ref('room').on('value', data => {
        this.editRoom = { ...data.val()[roomId], id: roomId };
      });
      this.form = new FormGroup({
        number: new FormControl(this.editRoom.roomNumber, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        type: new FormControl(this.editRoom.type, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        size: new FormControl(this.editRoom.size, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.editRoom.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(250)]
        }),
        image: new FormControl(this.editRoom.image, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        status: new FormControl(this.editRoom.status, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
      });
    });
  }

  onEditRoom() {
    if (!this.form.valid) {
      return;
    }
    this.alertCtrl.create({
      header: 'Edit room ?',
      message: 'Do you agree to Edit the room details?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Editing...',
              keyboardClose: true,
            }).then(loading => {
              loading.present();
              this.value.ref('room/' + this.editRoom.id).set({
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
                  message: 'Room details Edited!',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/home/' + this.editRoom.id]);
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
