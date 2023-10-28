import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  initialColor : string | null = "";
  color : string | null = "";
  constructor(){
    this.color =localStorage.getItem("boxShadow");
    this.initialColor = this.color
  }
}
