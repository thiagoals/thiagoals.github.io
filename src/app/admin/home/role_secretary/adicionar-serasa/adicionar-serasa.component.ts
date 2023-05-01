import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientsClient } from 'src/client/clients.client';
import { AddApplianceClient } from 'src/client/role_client/add-appliance';
import { Appliance } from 'src/models/Appliance';

@Component({
  selector: 'app-adicionar-serasa',
  templateUrl: './adicionar-serasa.component.html',
  styleUrls: ['./adicionar-serasa.component.css']
})
export class AdicionarSerasaComponent implements OnInit {

  applianceForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
    person: new FormControl('', [Validators.required], )
  })

  clients:any;

  constructor(private clientsClient: ClientsClient,private addApplianceClient: AddApplianceClient ,private router: Router, private activeRoute: ActivatedRoute,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.clients="";
    this.spinner.show();
    await this.clientsClient.execute().subscribe({
      next: (r: any) => {
        this.clients = r.personsResponse;
        this.spinner.hide();
      },
      error: (e) => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.router.navigate(['../../../'], {relativeTo: this.activeRoute});
      }
    })
  }

  async addAppliance(){
    this.spinner.show();
    let d = new Date();
    let appliance: Appliance = new Appliance(
      this.applianceForm.get("person").value,
      this.applianceForm.get("value").value,
      [`${d.getFullYear()}`, `0${d.getMonth()}`.substr(-2), `0${d.getDate()}`.substr(-2)].join("-"),
      null,
      "SERASA"
    );
    await this.addApplianceClient.execute(appliance).subscribe({
      next: (r: any) => {
        this.router.navigate(['admin']);
        this.spinner.hide();
        this.toastr.success("Operação adicionada com sucesso");
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error("Não foi possível adicionar a operação","OPS!");
      }
    })
  }

}
