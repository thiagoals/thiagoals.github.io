import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetAppliancesClient } from 'src/client/get-appliances.client';

@Component({
  selector: 'app-serasa',
  templateUrl: './serasa.component.html',
  styleUrls: ['./serasa.component.css']
})
export class SerasaComponent implements OnInit {

  appliances: any;
  page:number;
  item:number=15;
  actualPage: number;
  totalPages:number;
  pagination: any[] = [];
  selectedPage: number;

  constructor(private appliancesClient: GetAppliancesClient,private router:Router,private activeRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.appliances="";
    this.spinner.show();
    this.page = Number(this.activeRoute.snapshot.paramMap.get("page"));
    this.item = Number(this.activeRoute.snapshot.paramMap.get("item"));
    await this.appliancesClient.execute('SERASA',this.page-1,this.item).subscribe({
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
    });
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
        return "orange";
      default:
        return "grey";
    }
  }

  goToAddSerasa(){
    this.router.navigate(['/admin/serasa/adicionar'])
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
      this.router.navigate([`/admin/serasa/${page}/${this.item}`]).then(page => { window.location.reload(); });
  }

}
