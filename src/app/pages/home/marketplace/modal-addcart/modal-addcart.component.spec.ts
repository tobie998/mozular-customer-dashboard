import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddcartComponent } from './modal-addcart.component';

describe('ModalAddcartComponent', () => {
  let component: ModalAddcartComponent;
  let fixture: ComponentFixture<ModalAddcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
