import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodialPartyAccordionStep2Component } from './custodial-party-accordion-step2.component';

describe('CustodialPartyAccordionStep2Component', () => {
  let component: CustodialPartyAccordionStep2Component;
  let fixture: ComponentFixture<CustodialPartyAccordionStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodialPartyAccordionStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodialPartyAccordionStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
