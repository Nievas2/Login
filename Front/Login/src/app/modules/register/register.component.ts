import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  state = 'normal';
  registerLogin: boolean = true;
  toggleFlip() {
    this.state = this.state === 'normal' ? 'flipped' : 'normal';
    this.registerLogin = !this.register;
  }
  form: FormGroup;
  registro: boolean = false;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    admin: false,
  };
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      admin: ['', Validators.required],
    });
    this.register();
  }

  createUser() {
    this.user = {
      id: 0,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      admin: this.form.value.admin,
    };
console.log(this.user.admin)
    this.userService.postUser(this.user).subscribe(
      (data) => {
        this.toastr.success('Se registro correctamente');
        setTimeout(() => {
          
        location.reload()
        }, 500);
      },

      (error) => {
        this.toastr.error('El registro fallo');
      }
    );
  }

  register() {
    this.form.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      admin:'',
    });
  }
}
