import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasAplicacoesComponent } from './minhas-aplicacoes.component';

describe('MinhasAplicacoesComponent', () => {
  let component: MinhasAplicacoesComponent;
  let fixture: ComponentFixture<MinhasAplicacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasAplicacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAplicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
