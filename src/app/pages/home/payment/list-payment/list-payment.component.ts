import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnInit {
  constructor(private basethemeService: BaseThemeService) {}

  globals: Globals = this.basethemeService.getGlobalValue();
  ngOnInit(): void {}
}
