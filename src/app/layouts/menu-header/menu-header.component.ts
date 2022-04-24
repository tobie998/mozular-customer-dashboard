import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { SearchModule } from './search/search.component';
import { UserProfileModule } from './user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { HearderModel } from 'src/app/models/home/header.model';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent {
  @Input() option;
  @Output() callback = new EventEmitter<any>();
  @ViewChild('backE') backElement: ElementRef;
  hearder: HearderModel = new HearderModel()
  globals: Globals = this.basethemeService.getGlobalValue();
  listValue: Array<any>  = [];
  isSearch = false;
  url='';
  textSearch  = '';

  constructor(private router: Router, private basethemeService: BaseThemeService, private authService: AuthService, private sendDataService: SendDataService) {
    router.events.subscribe((val) => {
      this.url = this.router.url;
      this.listValue = this.hearder.create;
      this.listValue.forEach(value => {
        if (this.url.includes(value.path)) {
          value.showId = true;
        }
      });
    });
    // this.globals.urlFolder =  AppConfigService.settings.apiImagesSource;

  }
  onChangeValueInputSearch = (value) => {
    this.callback.emit(value);
  };
  back(url) {
    this.router.navigateByUrl(url);
  }
  logout(): void {
    this.authService.onLogout();
  }
  profileDetail() {
    
  }
  search() {
    console.log(this.textSearch);
    
    setTimeout(() => {
      this.sendDataService.changeData({code: 'searchModule', value: this.textSearch});
    }, 1000);
  }
  notSearch() {
    this.isSearch = false;
  }
  cart() {
    this.router.navigateByUrl('cart');
  }
}
@NgModule({
  declarations: [MenuHeaderComponent],
  imports: [
    CommonModule,
    UserProfileModule,
    FormsModule,
    ReactiveFormsModule, 
    SearchModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [MenuHeaderComponent, UserProfileModule],
})
export class MenuHeaderModule {}
