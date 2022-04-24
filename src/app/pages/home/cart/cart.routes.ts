import { Routes } from "@angular/router";
import { PaymentComponent } from "./payment/payment.component";
import { CartComponent } from "./cart.component";

export const cartRoutes: Routes = [
    {
        path: '',
        component: CartComponent,
    },
    {
        path: 'payment',
        component: PaymentComponent,
    }
]