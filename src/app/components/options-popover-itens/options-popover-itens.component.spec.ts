import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsPopoverItensComponent } from './options-popover-itens.component';

describe('OptionsPopoverItensComponent', () => {
  let component: OptionsPopoverItensComponent;
  let fixture: ComponentFixture<OptionsPopoverItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPopoverItensComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsPopoverItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
