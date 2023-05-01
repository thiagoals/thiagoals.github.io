import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class MyAppliancesClient{
    private url = `${environment.webserviceUri}/v1/appliances`

    constructor(private HttpClient: HttpClient){}

    execute(page:Number,item:Number){
        return this.HttpClient.get(`${this.url}/${page}/${item}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}