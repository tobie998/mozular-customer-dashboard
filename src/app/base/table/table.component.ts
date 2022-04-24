import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data;
  @Input() config: any;
  @Input() isPopup: any;
  @Input() title: any;
  @Output() callback = new EventEmitter<any>();
  p = 1;
  onClickAddResult(item, types): void {
    this.callback.emit({
      type: types,
      data: item
    });
  }
  close(): void {
    this.callback.emit({
      type: 'close'
    });
  }

}
