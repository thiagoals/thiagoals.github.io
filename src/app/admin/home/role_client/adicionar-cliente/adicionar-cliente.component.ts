import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddClientClient } from 'src/client/role_client/add-client.client';
import { Person } from 'src/models/Person';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})
export class AdicionarClienteComponent implements OnInit {

  personForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cpfCnpj: new FormControl('', [Validators.minLength(11), Validators.maxLength(14), Validators.pattern("^[0-9]*$")], )
  })

  constructor(private addClientClient: AddClientClient,private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  async addPerson(){
    this.spinner.show();
    let person: Person = new Person(this.personForm.get("name").value,this.personForm.get("cpfCnpj").value);
    await this.addClientClient.execute(person).subscribe({
      next: (r: any) => {
        this.router.navigate(['admin']);
        this.spinner.hide();
        this.toastr.success("Cliente adicionado com sucesso");
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error("Não foi possível adicionar o cliente","OPS!");
      }
    })
  }

}
