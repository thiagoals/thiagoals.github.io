import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginClient } from 'src/client/login.client';
import { LoginResponse } from 'src/models/responses/LoginResponse';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  constructor(private loginClient: LoginClient, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.validateSession();
  }

  async login(){
    this.spinner.show();
    let response;
    let user: User = new User(this.userForm.get('username').value,this.userForm.get('password').value)
    await this.loginClient.execute(user).subscribe({
      next: (r: LoginResponse) => {
        localStorage.setItem("name", r.name)
        localStorage.setItem("email", r.email)
        localStorage.setItem("role", r.role)
        localStorage.setItem("token", r.token)
        this.router.navigate(['admin']);
        this.spinner.hide();
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error("Usuário e/ou senha inválido(s).","OPS!");
      }
    })
  }

  async validateSession(){
    if(
      localStorage.getItem("token")!==null &&
      localStorage.getItem("name")!==null &&
      localStorage.getItem("email")!==null &&
      localStorage.getItem("role")!==null
    ){
      this.router.navigate(['admin'])
    }
  }

}
