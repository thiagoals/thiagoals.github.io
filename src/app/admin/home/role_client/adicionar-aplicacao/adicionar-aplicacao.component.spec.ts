import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAplicacaoComponent } from './adicionar-aplicacao.component';

describe('AdicionarAplicacaoComponent', () => {
  let component: AdicionarAplicacaoComponent;
  let fixture: ComponentFixture<AdicionarAplicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarAplicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAplicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
