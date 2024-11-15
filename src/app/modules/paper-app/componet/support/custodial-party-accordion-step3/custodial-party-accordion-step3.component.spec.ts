import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodialPartyAccordionStep3Component } from './custodial-party-accordion-step3.component';

describe('CustodialPartyAccordionStep3Component', () => {
  let component: CustodialPartyAccordionStep3Component;
  let fixture: ComponentFixture<CustodialPartyAccordionStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodialPartyAccordionStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodialPartyAccordionStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
