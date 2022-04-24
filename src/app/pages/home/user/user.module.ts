import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { Globals } from 'src/app/models/global/global';
import { userRoutes } from './user.routes';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ModalPasswordComponent } from './modal-password/modal-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserComponent, AddUserComponent, DetailUserComponent, ModalPasswordComponent],
  imports: [
    MenuHeaderModule,
    BaseModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [UserComponent],
  providers: [Globals],
})
export class UserModule {}
