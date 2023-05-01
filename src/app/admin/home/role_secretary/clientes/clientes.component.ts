import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetAllClientsClient } from 'src/client/role_secretary/get-all-clients.client';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  private clients: any;

  constructor(private getAllClientsClient: GetAllClientsClient,private router:Router,private activeRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.clients="";
    this.spinner.show();
    await this.getAllClientsClient.execute().subscribe({
      next: (r: any) => {
        this.clients = r.clientsResponse;
        this.spinner.hide();
      },
      error: (e) => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.router.navigate(['../../'], {relativeTo: this.activeRoute});
        
      }
    });
  }


  
  isDisplayed(){
    return this.clients!="" && JSON.stringify(this.clients)!="{}"
  }

  goToAddClient(){
    this.router.navigate(['/admin/usuarios/adicionar'])
  }

}
