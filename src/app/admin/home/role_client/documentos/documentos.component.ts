import { Component, OnInit } from '@angular/core';
import { DocumentsClient } from 'src/client/documents.client';
import { DocumentTypesClient } from 'src/client/document-types.client';
import { GetDocumentClient } from 'src/client/get-document.client';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDocumentClient } from 'src/client/role_client/add-document.client';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documentForm = new FormGroup({
    documentType: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  })

  applianceId: String;
  documents: any;
  documentTypes: any;
  fileToUpload: File | null = null;

  constructor(
    private documentsClient: DocumentsClient, 
    private documentTypesClient: DocumentTypesClient,
    private addDocumentClient: AddDocumentClient,
    private getDocumentClient: GetDocumentClient,
    private activatedRoute: ActivatedRoute, 
    private router:Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.applianceId = this.activatedRoute.snapshot.paramMap.get("applianceId");
    await this.documentsClient.execute(this.applianceId).subscribe({
      next: (r: any) => {
        this.documents = r.documents;
      },
      error: (e) => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.router.navigate(['../../../'], {relativeTo: this.activatedRoute});
      }
    });
    await this.documentTypesClient.execute().subscribe({
      next: (r: any) => {
        this.spinner.hide();
        this.documentTypes = r.documentTypes;
      },
      error: (e) => {
        this.spinner.hide();
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        localStorage.removeItem("token")
        this.router.navigate(['../../../'], {relativeTo: this.activatedRoute});
      }
    })
  }

  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0)
  }

  async addDocument(){
    let formData: FormData = new FormData();
    this.spinner.show();
    formData.append("file", this.fileToUpload, this.fileToUpload.name)
    await this.addDocumentClient.execute(this.applianceId,this.documentForm.get("documentType").value,formData).subscribe({
      next: (r:any) => {
        this.spinner.hide();
        this.toastr.success("Documento adicionado com sucesso.")
        this.reloadRouter()
      },
      error: (e) => {
        this.spinner.hide();
        this.toastr.error("Ocorreu um erro ao tentar criar o documento.", "OPS!")
      }
    })
  }
  
  isDisplayed(){
    return this.documents!="" && JSON.stringify(this.documents)!="{}"
  }

  reloadRouter(){
    const currentUrl = this.router.url
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([currentUrl]));
 }

 async getFile(documentId: String){
    this.spinner.show();
    await this.getDocumentClient.execute(documentId).subscribe({
      next: (r:any)=>{
        const downloadLink = document.createElement('a')
        downloadLink.href = r.data;
        downloadLink.download = r.name;
        downloadLink.click();
        this.spinner.hide();
      }, error: (e)=>{
        this.toastr.error("Não foi possível carregar o documento.");
        this.spinner.hide();
      }
    })
 }

}
