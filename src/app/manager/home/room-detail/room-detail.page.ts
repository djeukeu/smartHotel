import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from './room.model';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  loadedRoom: Room;
  value = firebase.database();
  roomId: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.loadRoom();
  }

  ionViewWillEnter() {
    this.loadRoom();
  }

  loadRoom() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('roomId')) {
        // redirect
        return;
      }
      this.roomId = paramMap.get('roomId');
      this.value.ref('room').on('value', data => {
        // tslint:disable-next-line: forin
        this.loadedRoom = { ...data.val()[this.roomId], id: this.roomId };
      });
    });
  }

  deleteRoom() {
    this.alertCtrl.create({
      header: 'Delete room ?',
      message: 'Do you agree to delete the room details?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deleting...',
              keyboardClose: true,
            }).then(loading => {
              loading.present();
              this.value.ref('room/' + this.roomId).remove();
              setTimeout(() => {
                loading.dismiss();
                this.alertCtrl.create({
                  message: 'Room details Deleted',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/home/']);
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
