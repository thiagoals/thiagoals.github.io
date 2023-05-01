import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class DocumentsClient{
    private url = `${environment.webserviceUri}/v1/document`

    constructor(private HttpClient: HttpClient){}

    execute(applianceId: String){
        return this.HttpClient.get(`${this.url}/${applianceId}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}