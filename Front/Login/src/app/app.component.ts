import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    const color = localStorage.getItem("boxShadow")
    if(color == null || color == undefined)localStorage.setItem("boxShadow", "#fff")
  }
}
