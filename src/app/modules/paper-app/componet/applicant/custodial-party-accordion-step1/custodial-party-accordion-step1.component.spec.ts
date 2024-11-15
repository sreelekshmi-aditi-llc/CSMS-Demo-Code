import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodialPartyAccordionStep1Component } from './custodial-party-accordion-step1.component';

describe('CustodialPartyAccordionComponent', () => {
  let component: CustodialPartyAccordionStep1Component;
  let fixture: ComponentFixture<CustodialPartyAccordionStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodialPartyAccordionStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodialPartyAccordionStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
