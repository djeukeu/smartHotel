import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRoomPage } from './edit-room.page';

describe('EditRoomPage', () => {
  let component: EditRoomPage;
  let fixture: ComponentFixture<EditRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
