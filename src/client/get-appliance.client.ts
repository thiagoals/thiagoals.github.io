import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class GetApplianceClient{
    private url = `${environment.webserviceUri}/v1/appliance`

    constructor(private HttpClient: HttpClient){}

    execute(id){
        return this.HttpClient.get(`${this.url}/${id}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}