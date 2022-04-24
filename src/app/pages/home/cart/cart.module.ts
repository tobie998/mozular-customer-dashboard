import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { Globals } from "src/app/models/global/global";
import { CartComponent } from "./cart.component";
import { cartRoutes } from "./cart.routes";
import { PaymentComponent } from './payment/payment.component';
import { ModalPaymentComponent } from './payment/modal-payment/modal-payment.component';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [
        CartComponent,
        PaymentComponent,
        ModalPaymentComponent
    ],
    imports: [
        MenuHeaderModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        BaseModule,
        RouterModule.forChild(cartRoutes)
    ],
    exports: [
        CartComponent
    ],
    providers: [ Globals ],
})
export class CartModule { }
