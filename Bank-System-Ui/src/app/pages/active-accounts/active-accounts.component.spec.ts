import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountsComponent } from './active-accounts.component';

describe('ActiveAccountsComponent', () => {
  let component: ActiveAccountsComponent;
  let fixture: ComponentFixture<ActiveAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
