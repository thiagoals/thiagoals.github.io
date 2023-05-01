import { Component } from '@angular/core';
import { MyAppliancesClient } from 'src/client/role_client/my-appliances.client';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-minhas-aplicacoes',
  templateUrl: './minhas-aplicacoes.component.html',
  styleUrls: ['./minhas-aplicacoes.component.css']
})
export class MinhasAplicacoesComponent {

  appliances: any="";
  page:number;
  item:number=15;
  actualPage: number;
  totalPages:number;
  pagination: any[] = [];
  selectedPage: number;

  constructor(private myAppliancesClient: MyAppliancesClient,private router:Router,private activeRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }

  async ngAfterViewInit() {
    this.appliances="";
    this.spinner.show();
    this.page = Number(this.activeRoute.snapshot.paramMap.get("page"));
    this.item = Number(this.activeRoute.snapshot.paramMap.get("item"));
    await this.myAppliancesClient.execute(this.page-1,this.item).subscribe({
      next: (r: any) => {
        this.appliances = r.appliances;
        this.totalPages = r.totalPages;
        this.actualPage = r.page;
        this.generatePagination();
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

  getStatusColor(status){
    switch(status){
      case "CRIADO":
        return "grey";
      case "DOCUMENTAÇÃO_INCOMPLETA":
        return "red";
      case "APROVADO":
        return "green";
      case "AGUARDANDO_DOCUMENTAÇÃO":
        return "blue";
      case "AGUARDANDO_APROVAÇÃO":
        return "yellow";
      default:
        return "grey";
    }
  }

  goToAddAppliance(){
    this.router.navigate(['/admin/minhas-aplicacoes/adicionar'])
  }
  
  isDisplayed(){
    return this.appliances!="" && JSON.stringify(this.appliances)!="{}"
  }

  generatePagination(){
    let count: number = 0;
    let i: number;
    for(i=this.page;i<=this.totalPages && count<4;i++){
      this.pagination.push({number: i, isSelected: i==this.page});
      if(i==this.page){
        this.selectedPage = i;
      }
      count++;
      console.log(i)
    }
  }

  reloadPage(page:number){
    if(page<=this.totalPages && page>=1)
      this.router.navigate([`/admin/minhas-aplicacoes/${page}/${this.item}`]).then(page => { window.location.reload(); });
  }

}
