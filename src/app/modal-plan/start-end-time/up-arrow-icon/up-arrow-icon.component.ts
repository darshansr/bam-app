import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'up-arrow-icon',
  templateUrl: './up-arrow-icon.component.html',
  styleUrls: ['./up-arrow-icon.component.css']
})
export class UpArrowIconComponent implements OnInit {
  @Input() uparrow;
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
