import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// import { AuthService } from '../service/auth.service';
import { Globals } from 'src/app/models/global/global';
import { CookieService } from 'ngx-cookie-service';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  globals: Globals = new Globals();

  constructor(
    private router: Router,
    // private companyService: CompanyService,
    private service: AuthService,
    private basethemeService: BaseThemeService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.globals = this.basethemeService.getGlobalValue();
    // this.loginForm.setValue({
    //   Username: '',
    //   FirstName: '',
    //   LastName: '',
    //   // Email: ['', Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    //   Email: '',
    //   Phone: '',
    //   DOB: '',
    //   Password: '',
    //   ConfirmPassword: '',
    // });
    // this.loginForm = this.fb.group({
    //   Username: ['', [Validators.required, Validators.maxLength(255)]],
    //   FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]'), Validators.maxLength(225)]],
    //   LastName: [''],
    //   // Email: ['', Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    //   Email: ['', [Validators.required, Validators.maxLength(255)]],
    //   Phone: ['', [Validators.required, Validators.maxLength(255)]],
    //   DOB: ['', [Validators.required, Validators.maxLength(255)]],
    //   Password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
    //   ConfirmPassword: ['', Validators.maxLength(20)],
    // });
  };
  email = '';
  lstError = [];
  lstRequired = [];
  dupEmail = false;
  model: any;
  submitted = false;
  typePass = 'password';
  typePassConfirm = 'password'
  loginForm = this.fb.group({
    Username: ['', [Validators.required, Validators.maxLength(255)]],
    FirstName: ['', [Validators.required,
                     Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$'),
                     Validators.maxLength(255)]],
    LastName: ['', [Validators.required, 
                    Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$'), 
                    Validators.maxLength(255)]],
    // Email: ['', Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    Email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    Phone: ['', [Validators.required, Validators.pattern('^[0][0-9]*$'), Validators.maxLength(10)]],
    DOB: ['', [Validators.required, Validators.maxLength(255)]],
    Password: ['', [Validators.minLength(6), Validators.maxLength(20), Validators.required]],
    ConfirmPassword: ['', [Validators.maxLength(20), Validators.required]],
  }, {
    validator: this.mustMatch('Password', 'ConfirmPassword')
  });
  /**
   * 1 : signUp
   * 2 : confirm
   * 3 : success
   */
  typeConfirm = 1;

  ngOnInit(): void {}
  setCookie(key: string): void {
    this.cookieService.set('key', key);
  }
  back() {
    this.router.navigate(['/login']);
  }
  signUp() {
    console.log(this.loginForm.value);
    // this.router.navigate(['/confirmation']);
    if (this.loginForm.valid && this.validateEmail(this.loginForm.value['Email']) && this.loginForm.value['Password'] === this.loginForm.value['ConfirmPassword']) {
      this.service.onSignup(this.loginForm).then(() => {
        this.email = this.loginForm.value['Email'];
        this.typeConfirm = 2;
      });;  

      this.router.navigate(['/confirmation']);
    }
    // this.router.navigate(['/login']);
    this.onSubmit();

  }
  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  codeCallBack (key) {
    this.service.confirmRegistration(this.loginForm.value['Email'], key).then(() => {
      this.typeConfirm = 3;
    });
  }
  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
