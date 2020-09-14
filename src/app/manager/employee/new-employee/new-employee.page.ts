import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Employee } from '../employee.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.page.html',
  styleUrls: ['./new-employee.page.scss'],
})
export class NewEmployeePage implements OnInit {

  form: FormGroup;
  newEmployee: Employee;
  value = firebase.database();

  constructor(private router: Router, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateOfBirth: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      gender: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl('assets/images/christian.jpg', {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateEmployee() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
    this.alertCtrl.create({
      header: 'Add employee ?',
      message: 'Do you agree to add the employee information?',
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
              this.value.ref('employee').push({
                firstName: this.form.value.firstName,
                lastName: this.form.value.lastName,
                dateOfBirth: this.form.value.dateOfBirth,
                image: this.form.value.image,
                status: this.form.value.status,
                gender: this.form.value.gender,
                phone: this.form.value.phone,
                email: this.form.value.email
              });
              setTimeout(() => {
                loading.dismiss();
                this.alertCtrl.create({
                  message: 'Employee added!',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/employee']);
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
