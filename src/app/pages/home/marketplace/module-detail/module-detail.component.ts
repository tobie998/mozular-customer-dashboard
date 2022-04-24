import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/models/global/global';
import { ModuleDetail } from 'src/app/models/home/module.model';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { CartService } from 'src/app/services/cart.service';
import { ModuleService } from 'src/app/services/module.service';
import { ModalPasswordComponent } from '../../user/modal-password/modal-password.component';
import { ModalAddcartComponent } from '../modal-addcart/modal-addcart.component';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {
  moduleDetail: ModuleDetail = new ModuleDetail();
  @ViewChild('full') full: ElementRef;
  
  isDeleted = false;
  status = false;
  showAdd = false;
  id = '';
  globals: Globals = new Globals();
  constructor(
    private router: Router,
    private basethemeService: BaseThemeService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private cartService: CartService,
    public dialog: MatDialog
  ) {
    this.globals = this.basethemeService.getGlobalValue();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.cartService.getMyCart().subscribe(res => {
      const listCart = res.Items.find(cart => cart.module_id == this.id);
      this.showAdd = listCart ? true : false;
    })
    this.moduleService.getMarketModules({"module_id": this.id}).subscribe(res => {
      if (res && res.length !== 0) {
        
        
        this.moduleDetail = res.Items[0];
        console.log(this.moduleDetail);
        // setTimeout(() => {
        //   console.log(this.full.nativeElement.offsetHeight);
          
        // }, 10);
       }
    })
  }

  addCart() {
    // this.cartService.addCartItem({"module_id": this.id, "count": 1}).subscribe(res => {
    //   this.showAdd = true;
      this.dialog.open(ModalAddcartComponent);
    // })
  }

  showMore(type: boolean): void {
   this.status = true;
   this.isDeleted = true;
  //  let showtext = document.getElementById("full");
  //  showtext.classList.add('show-text')
  }

}
