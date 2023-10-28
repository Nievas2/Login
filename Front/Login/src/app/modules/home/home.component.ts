import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Login';
  token: string | null = null;
  admin : boolean = false;
  register : boolean = false;
  colorSeleccionado: string ="";
  active : boolean =false;
  initialColor : string | null = "";
  color : string | null = "";
  @ViewChild('miDiv') miDiv!: ElementRef;

  cambiarSombra(event: any) {
    this.active = true
    this.colorSeleccionado = event.target.value;
    const divElement = this.miDiv.nativeElement;
    this.renderer.setStyle(divElement, 'box-shadow', `1px 1px 5px 5px ${this.colorSeleccionado}`);
  }
  constructor(private loginSvc:AuthService, private router: Router,private renderer: Renderer2){
    this.color =localStorage.getItem("boxShadow");
    this.initialColor = this.color
  }
  ngOnInit(): void {
    this.loginSvc.token.subscribe(
      (token) => {
        this.token = token;
      }
    )
    this.loginSvc.isAdmin.subscribe(
      (isAdmin)=>{
        this.admin = isAdmin
      }
    )
    this.loginSvc.isRegistered.subscribe(
      (isRegistered)=>{
        this.register = isRegistered
      }
    )
    
    
  }
  LogOut(){
    localStorage.removeItem("token");
    window.location.reload();
  }
  savedColor(){
    localStorage.setItem("boxShadow", this.colorSeleccionado);
    window.location.reload();
  }
}
