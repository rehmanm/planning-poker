import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryListComponent } from './userstory-list.component';

describe('UserstoryListComponent', () => {
  let component: UserstoryListComponent;
  let fixture: ComponentFixture<UserstoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
