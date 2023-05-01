import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Person } from "src/models/Person";
import { Appliance } from "src/models/Appliance";

@Injectable()
export class AddApplianceClient{
    private url = `${environment.webserviceUri}/v1/appliance`

    constructor(private HttpClient: HttpClient){}

    execute(appliance: Appliance){
        return this.HttpClient.post(`${this.url}`,appliance,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}