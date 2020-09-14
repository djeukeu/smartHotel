import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AirConditionerPage } from './air-conditioner.page';

describe('AirConditionerPage', () => {
  let component: AirConditionerPage;
  let fixture: ComponentFixture<AirConditionerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirConditionerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AirConditionerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
