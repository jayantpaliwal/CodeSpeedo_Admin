import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSubscriptionComponent } from './manual-subscription.component';

describe('ManualSubscriptionComponent', () => {
  let component: ManualSubscriptionComponent;
  let fixture: ComponentFixture<ManualSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
