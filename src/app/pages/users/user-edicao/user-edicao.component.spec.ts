import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEdicaoComponent } from './user-edicao.component';

describe('UserEdicaoComponent', () => {
  let component: UserEdicaoComponent;
  let fixture: ComponentFixture<UserEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
