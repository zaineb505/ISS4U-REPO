import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrdvComponent } from './modalrdv.component';

describe('ModalrdvComponent', () => {
  let component: ModalrdvComponent;
  let fixture: ComponentFixture<ModalrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalrdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
