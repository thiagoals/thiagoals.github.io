import { HttpClient } from "@angular/common/http";
import { User } from "src/models/User";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginClient{
    private url = `${environment.webserviceUri}/login`

    constructor(private HttpClient: HttpClient){}

    execute(user: User){
        return this.HttpClient.post(`${this.url}`, user);
    }
}