import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryDetailComponent } from './userstory-detail.component';

describe('UserstoryDetailComponent', () => {
  let component: UserstoryDetailComponent;
  let fixture: ComponentFixture<UserstoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
