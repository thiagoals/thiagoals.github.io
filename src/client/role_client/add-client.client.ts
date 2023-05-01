import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Person } from "src/models/Person";

@Injectable()
export class AddClientClient{
    private url = `${environment.webserviceUri}/v1/person`

    constructor(private HttpClient: HttpClient){}

    execute(person: Person){
        return this.HttpClient.post(`${this.url}`, person,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}