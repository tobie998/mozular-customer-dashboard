import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  @Output() passCallBack = new EventEmitter();
  constructor() { }
  password = '';
  confirmPassword = '';
  typePass = 'password';
  typePassConfirm = 'password';
  ngOnInit(): void {
  }
  confirm() {
    if (this.password === this.confirmPassword) {
      console.log(this.password, this.confirmPassword);
      
      // this.passCallBack.emit(this.confirmPassword);
    }
  }
}
