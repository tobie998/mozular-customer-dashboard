import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'marketplace',
                loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule),
            },
            {
              path: 'module',
              loadChildren: () => import('./module/module.module').then(m => m.ModuleModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
            },
            {
                path: 'setting',
                loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule),
            },
            {
                path: 'cart',
                loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
            },
            {
                path: '',
                redirectTo: 'marketplace',
                pathMatch: 'full',
            },
        ],
    }
];
