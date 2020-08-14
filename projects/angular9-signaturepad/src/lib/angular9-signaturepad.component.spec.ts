import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular9SignaturepadComponent } from './angular9-signaturepad.component';

describe('Angular9SignaturepadComponent', () => {
  let component: Angular9SignaturepadComponent;
  let fixture: ComponentFixture<Angular9SignaturepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular9SignaturepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular9SignaturepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
