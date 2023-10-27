import { Component } from '@angular/core';
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
  constructor(private loginSvc:AuthService){}
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
}
