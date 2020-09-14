import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee.model';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.page.html',
  styleUrls: ['./edit-employee.page.scss'],
})
export class EditEmployeePage implements OnInit {

  form: FormGroup;
  editEmployee: Employee;
  value = firebase.database();

  constructor(private activatedRoute: ActivatedRoute, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('employeeId')) {
        // redirect
        return;
      }
      const employeeId = paramMap.get('employeeId');
      this.value.ref('employee').on('value', data => {
        // tslint:disable-next-line: forin
        this.editEmployee = { ...data.val()[employeeId], id: employeeId };
        // this.loadedEmployee.dateOfBirth = new Date(data.val()[employeeId].dateOfBirth);
      });
    });
    this.form = new FormGroup({
      firstName: new FormControl(this.editEmployee.firstName, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl(this.editEmployee.lastName, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateOfBirth: new FormControl(this.editEmployee.dateOfBirth, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(this.editEmployee.email, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phone: new FormControl(this.editEmployee.phone, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      gender: new FormControl(this.editEmployee.gender, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      status: new FormControl(this.editEmployee.status, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(this.editEmployee.image, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onEditEmployee() {
    if (!this.form.valid) {
      return;
    }
    this.alertCtrl.create({
      header: 'Edit employee ?',
      message: 'Do you agree to Edit the employee information?',
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
              this.value.ref('employee/' + this.editEmployee.id).set({
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
                  message: 'Employee information Edited!',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/employee/' + this.editEmployee.id]);
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
