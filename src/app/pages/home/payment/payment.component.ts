import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  
  globals: Globals = this.basethemeService.getGlobalValue();
  constructor(private basethemeService: BaseThemeService) { }
  /**
   * check mode header 
   * status: true => mode search
   * status: true => mode normal
   */
  status = false;
  ngOnInit(): void {
  }

}
