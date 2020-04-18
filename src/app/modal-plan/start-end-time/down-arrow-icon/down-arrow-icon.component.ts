import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'down-arrow-icon',
  templateUrl: './down-arrow-icon.component.html',
  styleUrls: ['./down-arrow-icon.component.css']
})
export class DownArrowIconComponent implements OnInit {
  @Input() downarrow;
  @Output() timeIncDec = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onArrowClick(idAttr) {
   
    // let idAttr = (<HTMLInputElement>event.target).id
     console.log(idAttr);
    this.timeIncDec.emit(idAttr);
  }
  myStyle(pixel): object {
    return {"margin-left":pixel+"px"};
  } 
}
