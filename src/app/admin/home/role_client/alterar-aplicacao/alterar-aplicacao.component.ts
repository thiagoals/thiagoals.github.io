import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EditApplianceClient } from 'src/client/edit-appliance.client';
import { GetApplianceClient } from 'src/client/get-appliance.client';
import { GetApplianceTypesClient } from 'src/client/get-appliance-types.client';
import { Appliance } from 'src/models/Appliance';

@Component({
  selector: 'app-alterar-aplicacao',
  templateUrl: './alterar-aplicacao.component.html',
  styleUrls: ['./alterar-aplicacao.component.css']
})
export class AlterarAplicacaoComponent implements OnInit {

  applianceId:String;
  applianceStatuses:any;
  appliance:any;

  applianceForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
    person: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })

  constructor(private getApplianceClient:GetApplianceClient,private editApplianceClient: EditApplianceClient,private getApplianceStatusClient: GetApplianceTypesClient,private router: Router, private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.applianceId = this.activatedRoute.snapshot.paramMap.get("applianceId");

    this.getApplianceStatusClient.execute().subscribe({
      next: (r: any) => {
        this.applianceStatuses = r.applianceStatusResponse
      }, error: (e) =>{
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.toastr.error("Seu token expirou.");
        this.spinner.hide();
        this.router.navigate(['../../../../'], {relativeTo: this.activatedRoute});
      }
    })

    this.getApplianceClient.execute(this.applianceId).subscribe({
      next: (r:any)=>{
        this.appliance = r.applianceResponse;
        this.applianceForm.get("value").setValue(this.appliance.value);
        this.applianceForm.get("person").setValue(this.appliance.personId);
        this.applianceForm.get("status").setValue(this.appliance.statusId);
        this.spinner.hide();
      }, error: (e) => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.toastr.error("Seu token expirou.");
        this.spinner.hide();
        this.router.navigate(['../../../../'], {relativeTo: this.activatedRoute});
      }
    })
  }

  async editAppliance(){
    this.spinner.show();
    let d = new Date();
    let appliance: Appliance = new Appliance(
      this.applianceForm.get("person").value,
      this.applianceForm.get("value").value,
      "",
      this.applianceForm.get("status").value,
      "CREDIT"
    );
    await this.editApplianceClient.execute(this.applianceId,appliance).subscribe({
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
