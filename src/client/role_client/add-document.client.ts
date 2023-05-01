import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class AddDocumentClient{
    private url = `${environment.webserviceUri}/v1/document`

    constructor(private HttpClient: HttpClient){}

    execute(applianceId: String, documentTypeId: String, data: FormData){
        return this.HttpClient.post(`${this.url}/${applianceId}/${documentTypeId}`, data,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}