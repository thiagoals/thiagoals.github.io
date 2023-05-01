import { Component } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'content',
  //styleUrls: ["../../styles.css"],
  templateUrl: './content.component.html'
})
export class ContentComponent {
  name: String = localStorage.getItem("name");
  email: String = localStorage.getItem("email");
  role: String = localStorage.getItem("role");
  // Set our default values
  localState = { value: '' };

  // TypeScript public modifiers
  constructor() {}

  ngOnInit() {
  }

  
  isClient(){
    return this.role === "ROLE_CLIENT"
  }

  isAdmin(){
    return this.role === "ROLE_ADMIN"
  }

  isSecretary(){
    return this.role === "ROLE_SECRETARY"
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }
}
