import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class ClientsClient{
    private url = `${environment.webserviceUri}/v1/person/all`

    constructor(private HttpClient: HttpClient){}

    execute(){
        return this.HttpClient.get(`${this.url}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}