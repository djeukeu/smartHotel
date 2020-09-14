import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  employees: Employee[];
  value = firebase.database();

  constructor() { }

  ngOnInit() {
    // this.fetchData();
  }

  ionViewWillEnter(){
    this.fetchData();
  }

  fetchData() {
    this.employees = [];
    this.value.ref('employee').on('value', data => {
      // tslint:disable-next-line: forin
      for (const key in data.val()) {
        this.employees.push({ ...data.val()[key], id: key });
      }
    });
  }

}
