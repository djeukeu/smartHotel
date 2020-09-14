import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {

  loadedEmployee: Employee;
  value = firebase.database();
  employeeId: any;

  constructor(private activatedRoute: ActivatedRoute, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.loadEmployee();
  }

  ionViewWillEnter() {
    this.loadEmployee();
  }

  loadEmployee() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('employeeId')) {
        // redirect
        return;
      }
      this.employeeId = paramMap.get('employeeId');
      this.value.ref('employee').on('value', data => {
        // tslint:disable-next-line: forin
        this.loadedEmployee = { ...data.val()[this.employeeId], id: this.employeeId };
        // this.loadedEmployee.dateOfBirth = new Date(data.val()[employeeId].dateOfBirth);
      });
    });
  }

  deleteEmployee() {
    this.alertCtrl.create({
      header: 'Delete employee ?',
      message: 'Do you agree to delete the employee ?',
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
              this.value.ref('employee/' + this.employeeId).remove();
              setTimeout(() => {
                loading.dismiss();
                this.alertCtrl.create({
                  message: 'Employee Deleted!',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/manager/employee/']);
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
