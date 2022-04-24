import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { AuthService } from 'src/app/services/auth.service';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  globals: Globals = new Globals();
  email = '';
  code = '';
  vertify = false;
  new_pass = false;
  success = false;
  textEmail = '';
  registerForm: FormGroup;
  submitted = false;

  constructor(private basethemeService: BaseThemeService,private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.globals = this.basethemeService.getGlobalValue();

   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailValid: ['', [Validators.required, Validators.email]],
    })
  }

  // get f() {
  //   return this.registerForm.controls;
  // }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      console.log(1111, this.registerForm.controls.emailValid.errors, this.submitted);
      return;
    }
  }

  back() {
    if (this.vertify === true) {
      this.vertify = false;
    } else if (this.new_pass === true) {
      this.vertify = true;
      this.new_pass = false;
    } else {
      this.router.navigate(['/login']);
    }
  }
  onForgot() {
    this.onSubmit();
    if (this.registerForm.invalid) {
      console.log(1111, this.registerForm.controls.emailValid.errors, this.submitted);
    } else {
      this.authService.onForgot(this.registerForm.value['emailValid']).then(() => {
        this.vertify = true;
      });
    }
  }
  codeCallBack(code: string) {
    this.code = code;
    this.vertify = false;
    this.new_pass = true;
  }
  confirm(password: string){
    this.authService.confirmPassword(this.registerForm.value['emailValid'], this.code, password)
        .then(() => {
          this.success = true;
        });
  }
  // validateEmail(email: string) {
  //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }
}
