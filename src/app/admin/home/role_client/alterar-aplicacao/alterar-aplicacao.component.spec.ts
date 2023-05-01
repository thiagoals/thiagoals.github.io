import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarAplicacaoComponent } from './alterar-aplicacao.component';

describe('AlterarAplicacaoComponent', () => {
  let component: AlterarAplicacaoComponent;
  let fixture: ComponentFixture<AlterarAplicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarAplicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarAplicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
