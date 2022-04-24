import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Globals } from 'src/app/models/global/global';
import { ModuleDetail } from 'src/app/models/home/module.model';
import { UserDetail } from 'src/app/models/home/user.model';
import { PaymentModel } from 'src/app/models/home/payment.model';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  globals: Globals = new Globals();
  user: UserDetail = new UserDetail();
  listModule: ModuleDetail[] = [];
  total: any;
  paymentMethods: PaymentModel[] = [];
  item: any;
  methodName = '';

  constructor(
    private basethemeService: BaseThemeService,
    private cartService: CartService,
    private router: Router,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.globals = this.basethemeService.getGlobalValue();
  }
  paymentForm = this.fb.group({
    show_name: ['', [Validators.required, Validators.maxLength(255)]],
    organization_name: [''],
    email: ['', [Validators.required, Validators.maxLength(255)]],
    phone: ['', [Validators.required, Validators.maxLength(255)]],
  });

  ngOnInit(): void {
    this.getlist();
    this.cartService.getPaymentMethods().subscribe((res: any) => {
      this.paymentMethods = res.content.Items;
    }),
      this.userService.getMyProfile().subscribe((res: any) => {
        this.user = res.Items[0];
        this.paymentForm.patchValue({
          show_name: this.user.show_name,
          organization_name: this.user.organization_name,
          email: this.user.email,
          phone: this.user.phone,
        });
      });
  }
  getlist() {
    this.cartService.getMyCart().subscribe((res) => {
      this.listModule = res.Modules.Items;
      this.total = res.Total;
      // this.total = res.Total.total;
    });
  }

  payment() {
    if (this.methodName !== '') {
      this.cartService.payWithPaymentMethods({"method_name": this.methodName}).subscribe(res => {
        alert('Yêu cầu thanh toán thành công!');
        this.router.navigateByUrl(`module`);
      });
    } else {
      alert('Chưa chọn phương thức thanh toán');
    }
  }
}
