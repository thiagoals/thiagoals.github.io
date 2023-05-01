import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddUserRequest } from "src/models/request/AddUserRequest";

@Injectable()
export class AddUserClient{
    private url = `${environment.webserviceUri}/v1/user`

    constructor(private HttpClient: HttpClient){}

    execute(user: AddUserRequest){
        return this.HttpClient.post(`${this.url}`,user,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
    }
}