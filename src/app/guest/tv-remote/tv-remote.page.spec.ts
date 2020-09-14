import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TvRemotePage } from './tv-remote.page';

describe('TvRemotePage', () => {
  let component: TvRemotePage;
  let fixture: ComponentFixture<TvRemotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvRemotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TvRemotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
