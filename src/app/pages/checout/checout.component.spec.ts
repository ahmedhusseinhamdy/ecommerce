import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecoutComponent } from './checout.component';

describe('ChecoutComponent', () => {
  let component: ChecoutComponent;
  let fixture: ComponentFixture<ChecoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
