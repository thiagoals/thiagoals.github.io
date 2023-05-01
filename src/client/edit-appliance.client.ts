import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class EditApplianceClient{
    private url = `${environment.webserviceUri}/v1/appliance`

    constructor(private HttpClient: HttpClient){}

    execute(id,body){
        return this.HttpClient.put(`${this.url}/${id}`, body,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}