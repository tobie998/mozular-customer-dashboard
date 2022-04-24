import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { Globals } from "src/app/models/global/global";
import { marketplaceRoutes } from "./marketplace.routes";
import { MarketplaceComponent } from "./marketplace.component";
import { CommonModule } from "@angular/common";
import { ColorbytextPipeModule } from "src/app/utils/pipes/colorbytext.pipe";
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModalAddcartComponent } from './modal-addcart/modal-addcart.component';
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [
        MarketplaceComponent,
        ModuleDetailComponent,
        ModalAddcartComponent
    ],
    imports: [
        CommonModule,
        MenuHeaderModule,
        BaseModule,
        TranslateModule,
        MatDialogModule,
        ColorbytextPipeModule,
        RouterModule.forChild(marketplaceRoutes)
    ],
    exports: [
        MarketplaceComponent
    ],
    providers: [ Globals ],
})
export class MarketplaceModule { }
