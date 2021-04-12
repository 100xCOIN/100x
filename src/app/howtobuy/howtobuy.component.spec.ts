import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtobuyComponent } from './howtobuy.component';

describe('HowtobuyComponent', () => {
  let component: HowtobuyComponent;
  let fixture: ComponentFixture<HowtobuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowtobuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtobuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
