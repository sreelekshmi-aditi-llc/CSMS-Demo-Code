import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodialPartyAccordionStep5Component } from './custodial-party-accordion-step5.component';

describe('CustodialPartyAccordionStep5Component', () => {
  let component: CustodialPartyAccordionStep5Component;
  let fixture: ComponentFixture<CustodialPartyAccordionStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodialPartyAccordionStep5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodialPartyAccordionStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
