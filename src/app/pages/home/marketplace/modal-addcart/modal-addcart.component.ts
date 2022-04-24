import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { AuthService } from 'src/app/services/auth.service';
import { BaseThemeService } from 'src/app/services/base-theme.service';

@Component({
  selector: 'app-modal-addcart',
  templateUrl: './modal-addcart.component.html',
  styleUrls: ['./modal-addcart.component.scss']
})
export class ModalAddcartComponent implements OnInit {
  globals: Globals = new Globals();
  constructor(private basethemeService: BaseThemeService, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalAddcartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private authService: AuthService ) {
    this.globals = this.basethemeService.getGlobalValue();
  }

  ngOnInit(): void {
  }

  close(type: boolean): void  {
    this.dialogRef.close();
  }
  
}
