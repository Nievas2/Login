import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { LoginData } from 'src/app/interfaces/loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flip', [
      state(
        'normal',
        style({
          /*  transform: 'none' */
        })
      ),
      state(
        'flipped',
        style({
          /* 
        transform: 'rotateY(180deg)' */
        })
      ),
      transition('normal => flipped', animate('800ms ease-in')),
    ]),
  ],
})
export class LoginComponent {
  state = 'normal';
  registerLogin: boolean = true;
  toggleFlip() {
    this.state = this.state === 'normal' ? 'flipped' : 'normal';
    this.registerLogin = !this.registerLogin;
  }
  formLogin: FormGroup;
  registro: boolean = false;
  loginData: LoginData = {
    email: '',
    password: '',
  };
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private loginSvc:AuthService,
    private router: Router,
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginDataForm();
  }

  login () {
    this.loginData = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    }
    try {
      this.loginSvc.login(this.loginData);
      this.router.navigateByUrl('');
    } catch {
      /* this.loginError = "Email o contraseña incorrecta."; */
    }
    this.router.navigateByUrl('');
    
  }

  loginDataForm() {
    this.formLogin.setValue({
      email: '',
      password: '',
    });
  }
  stateLogin() {
    this.registerLogin = !this.registerLogin;
  }
}
