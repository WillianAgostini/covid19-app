import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstadosPage } from './estados.page';

describe('EstadosPage', () => {
  let component: EstadosPage;
  let fixture: ComponentFixture<EstadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
