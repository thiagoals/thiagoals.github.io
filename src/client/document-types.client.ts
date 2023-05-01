import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class DocumentTypesClient{
    private url = `${environment.webserviceUri}/v1/document-type`

    constructor(private HttpClient: HttpClient){}

    execute(){
        return this.HttpClient.get(`${this.url}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}