import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class GetDocumentClient{
    private url = `${environment.webserviceUri}/v1/document/download`

    constructor(private HttpClient: HttpClient){}

    execute(documentId: String){
        return this.HttpClient.get(`${this.url}/${documentId}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}