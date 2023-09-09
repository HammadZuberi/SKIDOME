import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

  @Input() pageSize?:number;
  @Input() totalNumber?:number;
  // treated as the parent component here to emmit output event as type number
  @Output() pageChanged =new EventEmitter<number>();

onPageChanged(event :any){
this.pageChanged.emit(event.page);


}
}
