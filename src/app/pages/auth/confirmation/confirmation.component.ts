import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { AuthService } from 'src/app/services/auth.service';
import { BaseThemeService } from 'src/app/services/base-theme.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @ViewChild('input0') input0Element: ElementRef;
  @ViewChild('input1') input1Element: ElementRef;
  @ViewChild('input2') input2Element: ElementRef;
  @ViewChild('input3') input3Element: ElementRef;
  @ViewChild('input4') input4Element: ElementRef;
  @ViewChild('input5') input5Element: ElementRef;
  @Input() email = '';
  @Output() codeCallBack = new EventEmitter();
  focusInput = 0;
  textEmail = '';
  globals: Globals = new Globals();
  constructor(
    private basethemeService: BaseThemeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.globals = this.basethemeService.getGlobalValue();
  }
  time = 30;
  code: Array<string> = new Array(6);
  ngOnInit(): void {
    let index = this.email.indexOf('@');
    let length = this.email.length;
    this.textEmail =
      this.email.slice(0, 2) +
      '*****' +
      this.email.slice(index, length);
    setTimeout(() => {
      this.input0Element.nativeElement.focus();
    }, 0);
    setInterval(() => {
      console.log(123);
      
      if (this.time !== 0) {
        this.time--;
      }
    }, 1000);
  }
  channgeFocus(type: number) {
    console.log(1234, type);
    if (this.code[type - 1] !== '') {
      this.focusInput = type;
      setTimeout(() => {
        if (this.code[type - 1].length !== 1) {
          this.code[type] = this.code[type - 1].substring(1, 2);
          this.code[type - 1] = this.code[type - 1].substring(0, 1);
          this[`input${type-1}Element`].nativeElement.value = this.code[type - 1];
        }
        this[`input${type}Element`].nativeElement.focus();
      }, 10);
    } else {
    }
  }
  onPaste(event: ClipboardEvent) {
    console.log(123, event);
    this.code = new Array(6);
      setTimeout(() => {
        console.log('CTRL +  V', event, this.code[0]);
        let text = this[`input${this.focusInput-1}Element`].nativeElement.value;
        console.log(text);
        
        this.code = [
          (text.length > 0)?text[0]: '',
          (text.length > 1)?text[1]: '',
          (text.length > 2)?text[2]: '',
          (text.length > 3)?text[3]: '',
          (text.length > 4)?text[4]: '',
          (text.length > 5)?text[5]: '',
        ];
        this.focusInput = 0;
        this[`input${this.focusInput}Element`].nativeElement.focus();
      }, 0);
  }
  back(text) {
    this.router.navigate([text]);
  }
  confirm() {
    if (this.code.join('').length >= 6) {
      this.codeCallBack.emit(this.code.join(''));
    }
  }
  resendConfirm() {
    this.authService.resendConfirm(this.email).then(() => {
      this.time = 30;
    })
  }
}
