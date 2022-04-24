import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { Globals } from 'src/app/models/global/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.scss']
})
export class ModalPasswordComponent implements OnInit {
  constructor(
    private basethemeService: BaseThemeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  globals: Globals = this.basethemeService.getGlobalValue();

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl("")
    });
  }


  passwordForm: FormGroup;
  onSubmit(){
    this.dialogRef.close(this.passwordForm.value.password);
  }
  onChangePassword() {
    this.dialogRef.close();
  }

}
