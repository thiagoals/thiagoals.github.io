import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddUserClient } from 'src/client/role_secretary/add-user.client';
import { AddUserRequest } from 'src/models/request/AddUserRequest';
import { CustomValidator } from 'src/validators/CustomValidator';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css']
})
export class AdicionarUsuarioComponent implements OnInit {
  
  userForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cemail: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    csenha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    tipo: new FormControl('', [Validators.required]),
  },[
    CustomValidator.MatchEmailValidator('email','cemail'),
    CustomValidator.MatchPasswordValidator('senha', 'csenha')
  ])

  constructor(private addUserClient: AddUserClient,private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  emailError(){
    return this.userForm.getError('emailMismatch') && this.userForm.get('cemail').valueChanges
  }


  passwordError(){
    return this.userForm.getError('passwordMismatch') && this.userForm.get('csenha').valueChanges
  }

  async addUser(){
    this.spinner.show();
    let user = new AddUserRequest(
      this.userForm.get('nome').value,
      this.userForm.get('email').value,
      this.userForm.get('senha').value,
      this.userForm.get('tipo').value
    );
    await this.addUserClient.execute(user).subscribe({
      next: (r: any) => {
        this.router.navigate(['admin']);
        this.spinner.hide();
        this.toastr.success("Usuário adicionado com sucesso");
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error("Não foi possível adicionar o usuário","OPS!");
      }
    })
  }

}
