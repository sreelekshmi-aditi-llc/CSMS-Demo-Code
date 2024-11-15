import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodialPartyAccordionStep4Component } from './custodial-party-accordion-step4.component';

describe('CustodialPartyAccordionStep4Component', () => {
  let component: CustodialPartyAccordionStep4Component;
  let fixture: ComponentFixture<CustodialPartyAccordionStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodialPartyAccordionStep4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodialPartyAccordionStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
