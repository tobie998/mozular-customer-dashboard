import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { SendDataService } from 'src/app/services/send-data.service';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  @Output() callBacck = new EventEmitter();
  globals: Globals = new Globals();
  menu = false;
  listNav = [];
  subscription: Subscription;
  constructor(
    private sendDataService: SendDataService, 
    private basethemeService: BaseThemeService
  ) {  }

  companyDetal: any;
  ngOnInit(): void {
    this.globals = this.basethemeService.getGlobalValue();
    this.updateNar();
    this.basethemeService.currentMessage.subscribe(data => {
      if (data && data !== 'default message') { 
        setTimeout(() => {
          console.log(this.globals, this.listNav);
          this.updateNar();
        }, 100);
      }
    })
    // this.subscription = this.sendDataService.currentMessage.subscribe(data => {
    //   if (data && data !== 'default message') {
    //     const dataConvert = JSON.parse(data);
    //     if (dataConvert && dataConvert.type && dataConvert.type === 'nar') {
    //       this.listNav = dataConvert.ListNav;
    //     } else {
    //       this.companyDetal = JSON.parse(data);
    //     }
    //     setTimeout(() => {
    //       console.log(this.globals, this.listNav);
          
    //     }, 100);
    //     // this.getCompany();
    //   }
    // });
    // this.getCompany();
  }
  getCompany(): void {
    // this.service.detail().subscribe(res => {
    //   this.companyDetal = res;
    // });
  }
  updateNar() {
    this.listNav = [
      {
        iconActive: `${this.globals.urlFolder}svg/market-place.svg`,
        icon: `${this.globals.urlFolder}png/Marketplace.png`,
        name: 'Marketplace',
        router: '/marketplace'
      },
      {
        icon: `${this.globals.urlFolder}png/My modules.png`,
        iconActive: `${this.globals.urlFolder}svg/modules.svg`,
        name: 'Modules',
        router: '/module'
      },
      {
        icon: `${this.globals.urlFolder}png/List of users.png`,
        iconActive: `${this.globals.urlFolder}svg/users.svg`,
        name: 'Thành viên',
        router: '/user'
      },
      // {
      //   icon: `${this.globals.urlFolder}png/Billing.png`,
      //   name: 'Danh sách thanh toán',
      //   router: '/payment'
      // },
      {
        icon: `${this.globals.urlFolder}png/Settings.png`,
        iconActive: `${this.globals.urlFolder}svg/settings.svg`,
        name: 'Cài đặt',
        router: '/setting'
      }
    ];
  }
  toggerMenu() {
    this.menu = !this.menu;
    this.callBacck.emit(this.menu);
  }
}

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  providers: [ Globals ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuBarComponent, RouterModule]
})
export class MenuBarModule { }
