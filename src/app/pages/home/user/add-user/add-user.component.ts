import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { UserService } from 'src/app/services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/home/department.model';
import { PostFileS3Service } from 'src/app/services/post-file-s3.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addForm = this.fb.group({
    user_id: ['', [Validators.required, Validators.maxLength(255)]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(255)]],
  });
  contentType = '';
  fileName = '';
  isTouchSave = false;
  lstDe: Department[] = [];
  imgUrl = '';
  lstSelected: Department[] = [];
  constructor(
    private basethemeService: BaseThemeService,
    private userService: UserService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private postFileS3Service: PostFileS3Service,
    private router: Router,
    public dialog: MatDialog
  ) {

  }
  globals: Globals = this.basethemeService.getGlobalValue();
  file: File;
  ngOnInit(): void {
    this.departmentService.getMyDepartments().subscribe((res) => {
      this.lstDe = res.Items;
      console.log(res.Items);
    });
  }
  handleFileInput(data: File[]) {
    let reader = new FileReader();
    this.file = data[0];
    this.fileName = this.file.name;
    this.contentType = this.file.type;
    reader.readAsDataURL(data[0]);
    const herf = this;
    reader.onload = function () {
      herf.imgUrl = reader.result as string;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  addMember() {
    console.log(this.addForm);
    this.isTouchSave = true;
    if (this.addForm.valid) {
      let data = this.addForm.value;
      data.password = '123456';
      let listApi: any[] = [];
      this.lstSelected.forEach(select => {
        if (select.department_id === 'new') {
          listApi.push(this.departmentService.addDepartment({ name: select.name, description: select.description }));
        }
      });
      // listApi.push(this.userService.updateShowName(dataUser));
      // listApi.push(this.userService.updatePersonalInfo(dataUser));
      forkJoin(listApi).subscribe((res: any) => {
        console.log(res);
      });
      listApi = [];
  
      // this.userService.profileGenerateUserPresignedUrl()
      this.userService.profileAddUser(this.addForm.value).subscribe(res => {
        const req = {
          user_id: res.user_id,
          type: 'IMAGES',
          folder: 'AVATAR',
          file_name: this.fileName,
          content_type: this.contentType
        };
        if (this.file) {
          this.userService.profileGenerateUserPresignedUrl(req).subscribe((res1: any) => {
            this.postFileS3Service.postUserProfileFileS3(res1.content,  this.file,  this.file.type).subscribe(res2 => {
              console.log(res2);
              let url = new URL(res1.content);
              let urlText = url.origin + url.pathname;
              this.userService.profileUpdateUserProfileImage({
                user_id: res.user_id,
                type: 'IMAGES',
                folder: 'AVATAR',
                url: urlText,
              }).subscribe(resUpdateImg => {
                alert('Thêm mới thành viên thành công.');
                this.router.navigateByUrl(`user`);
              })
            });
          });
        } else {
          alert('Thêm mới thành viên thành công.');
          this.router.navigateByUrl(`user`);
        }
      });
    }
    

  }




}
