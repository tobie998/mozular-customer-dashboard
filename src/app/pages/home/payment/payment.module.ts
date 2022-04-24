import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { Globals } from "src/app/models/global/global";
import { paymentRoutes } from "./payment.routes";
import { PaymentComponent } from "./payment.component";
import { SearchComponent } from "src/app/layouts/menu-header/search/search.component";
import { SearchPaymentComponent } from "./search-payment/search-payment.component";
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        PaymentComponent, 
        SearchPaymentComponent,
        ListPaymentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MenuHeaderModule,
        BaseModule,
        RouterModule.forChild(paymentRoutes)
    ],
    exports: [
        PaymentComponent,
        SearchPaymentComponent,
        ListPaymentComponent
    ],
    providers: [ Globals ],
})
export class PaymentModule { }
