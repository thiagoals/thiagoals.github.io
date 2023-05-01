import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacoesComponent } from './aplicacoes.component';

describe('AplicacoesComponent', () => {
  let component: AplicacoesComponent;
  let fixture: ComponentFixture<AplicacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
