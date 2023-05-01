import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyClientsClient } from 'src/client/role_client/my-clients.client';

@Component({
  selector: 'app-meus-clientes',
  templateUrl: './meus-clientes.component.html',
  styleUrls: ['./meus-clientes.component.css']
})
export class MeusClientesComponent implements OnInit {

  clients: any="";

  constructor(private myClientsClient: MyClientsClient,private router:Router,private activeRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }

  async ngAfterViewInit() {
    this.clients="";
    this.spinner.show();
    await this.myClientsClient.execute().subscribe({
      next: (r: any) => {
        this.clients = r.persons;
        this.spinner.hide();
      },
      error: (e) => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.router.navigate(['../../'], {relativeTo: this.activeRoute});
      }
    })
  }

  ngOnInit() {
  }

  getPersonType(cpfCnpj){
    switch(cpfCnpj.length){
      case 14:
        return "Jurídica"
      case 11:
        return "Física"
      default:
        return "#"
    }
  }

  goToAddClient(){
    this.router.navigate(['admin/meus-clientes/adicionar'])
  }
  
  isDisplayed(){
    return this.clients!="" && JSON.stringify(this.clients)!="{}"
  }

}
