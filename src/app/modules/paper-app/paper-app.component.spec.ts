import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAppComponent } from './paper-app.component';

describe('PaperAppComponent', () => {
  let component: PaperAppComponent;
  let fixture: ComponentFixture<PaperAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
