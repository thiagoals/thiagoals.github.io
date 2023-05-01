import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarSerasaComponent } from './adicionar-serasa.component';

describe('AdicionarSerasaComponent', () => {
  let component: AdicionarSerasaComponent;
  let fixture: ComponentFixture<AdicionarSerasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarSerasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarSerasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
