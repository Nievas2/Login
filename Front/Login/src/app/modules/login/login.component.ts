import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flip', [
      state('normal', style({
       /*  transform: 'none' */
      })),
      state('flipped', style({/* 
        transform: 'rotateY(180deg)' */
      })),
      transition('normal => flipped', animate('800ms ease-in')),
    ]),
  ],
})
export class LoginComponent {
  state = 'normal';
  registerLogin : boolean = true
  toggleFlip() {
    this.state = this.state === 'normal' ? 'flipped' : 'normal'; 
    this.registerLogin = !this.register
  }
  form: FormGroup;
  registro:boolean=false;
  user: User = {
    id: 0,
    firstName:"",
    lastName:'',
    email:'',
    password:'',
    admin:false,
   

  }
  constructor(private userService: UserService,private fb: FormBuilder,private router: Router,) { 
      this.form = this.fb.group({
        firstName:  ['', Validators.required],
        lastName:  ['', Validators.required],
        email:  ['', Validators.required],
        password:  ['', Validators.required],

      })
      this.register()
  }

  createUser(){
    this.user = {
      id:0,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      admin:false,
    }

    this.userService.postUser(this.user)
    .subscribe(
      (data) => {this.registro= true;},
      (error) => {
        console.log(error);
      }
    );
  }

  register(){
    this.form.setValue({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    })
  }
  stateLogin(){
    this.registerLogin = !this.registerLogin
  }
  
}
