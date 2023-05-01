import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class GetAppliancesClient{
    private url = `${environment.webserviceUri}/v1/appliances/all`

    constructor(private HttpClient: HttpClient){}

    execute(type: String,page:Number,item:Number){
        return this.HttpClient.get(`${this.url}/${type}/${page}/${item}`, {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}