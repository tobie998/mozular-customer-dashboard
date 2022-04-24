import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { ModuleDetail } from 'src/app/models/home/module.model';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  globals: Globals = new Globals();
  listModule: ModuleDetail[] = [];
  voucher = '';
  total = 0;
  constructor(
    private basethemeService: BaseThemeService,
    private cartService: CartService,
    private router: Router
  ) {
    this.globals = this.basethemeService.getGlobalValue();
  }

  ngOnInit(): void {
    this.getlist();
  }
  addVoucher() {
    if (this.voucher.trim() !== '') {
      this.cartService
      .applyCartCoupon({ coupon_code: this.voucher.trim() })
      .subscribe((res) => {
        this.voucher = '';
        this.getlist();
      });
    }
    
  }

  getlist() {
    this.cartService.getMyCart().subscribe((res) => {
      this.listModule = res.Modules.Items;
      this.total = res.Total.total;
    });
  }
  deleteModule(module: ModuleDetail) {
    this.cartService.removeCartItem({module_id:module.module_id}).subscribe(res => {
      this.getlist();
    })
  }
  payment(): void {
    this.router.navigateByUrl(`cart/payment`);
  }
  showMore() {
    this.router.navigateByUrl(`marketplace`);
  }
}
