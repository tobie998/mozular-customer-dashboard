import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { Module } from 'src/app/models/home/module.model';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { CartService } from 'src/app/services/cart.service';
import { ModuleService } from 'src/app/services/module.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  globals: Globals = new Globals();
  lstModule: Module[] = [];
  constructor(
    private router: Router,
    private basethemeService: BaseThemeService,
    private moduleService: ModuleService,
    private cartService: CartService,
    private sendDataService: SendDataService
  ) {
    this.globals = this.basethemeService.getGlobalValue();
    this.sendDataService.currentMessage.subscribe((res: any) => {
      if (res && res !== 'default message') {
        if (res.code === 'searchModule') {
          this.getListModule(res.value);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getListModule();
  }
  getListModule(key = '') {
    this.lstModule = [];
    this.moduleService.searchMarketModules({ term: key }).subscribe((res) => {
      this.lstModule = res.Items;
    });
  }
  showDetail(item: any, event: any) {
    if (event === 'detail') {
      this.router.navigateByUrl(`marketplace/detail/${item.module_id}`);
    } else {
      this.cartService.addCartItem({"module_id": item.module_id, "count": 1}).subscribe(res => {
      })
    }
  }
}
