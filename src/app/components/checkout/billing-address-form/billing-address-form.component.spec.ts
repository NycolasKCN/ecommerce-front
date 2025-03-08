import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressFormComponent } from './billing-address-form.component';

describe('BillingAddressFormComponent', () => {
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingAddressFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
