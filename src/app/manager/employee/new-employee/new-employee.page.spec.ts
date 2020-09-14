import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEmployeePage } from './new-employee.page';

describe('NewEmployeePage', () => {
  let component: NewEmployeePage;
  let fixture: ComponentFixture<NewEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmployeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
