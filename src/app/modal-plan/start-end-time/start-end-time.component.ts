import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-start-end-time',
  templateUrl: './start-end-time.component.html',
  styleUrls: ['./start-end-time.component.css']
})
export class StartEndTimeComponent implements OnInit {
  idAttr: string;
  hourList = [];
  minuteList = [];

  // inputitem = [{
  //   type: 'number',
  //   id: "van-hour",
  //   class: "input-tip",
  //   formControlName: "vanHH"
  // },
  // {
  //   type: 'number',
  //   id: "van-min",
  //   class: "input-tip",
  //   formControlName: "vanMM"
  // },
  // {
  //   type: 'number',
  //   id: "tot-hour",
  //   class: "input-tip",
  //   formControlName: "totHH"
  // },
  // {
  //   type: 'number',
  //   id: "tot-min",
  //   class: "input-tip",
  //   formControlName: "totMM"
  // }, { type: 'nameLabel', value: 'van:' }, { type: 'nameColon', value: ':' }, { type: 'nameLabel', value: 'tot:' }, { type: 'nameColon', value: ':' }]

  uparrows = [{ id: 'separator' },
  { id: 'van-hour-inc', src: 'up', title: 'van-hour-increment', val: 38 },
  { id: 'separator' },
  { id: 'van-min-inc', src: 'up', title: 'van-min-increment', val: 19 },
  { id: 'separator' },
  { id: 'tot-hour-inc', src: 'up', title: 'tot-hour-increment', val: 68 },
  { id: 'separator' },
  { id: 'tot-min-inc', src: 'up', title: 'tot-min-increment', val: 19 },
  ]
  downarrows = [{ id: 'separator' },
  { id: 'van-hour-dec', src: 'down', title: 'van-hour-decrement', val: 38 },
  { id: 'separator' },
  { id: 'van-min-dec', src: 'down', title: 'van-min-decrement', val: 19 },
  { id: 'separator' },
  { id: 'tot-hour-dec', src: 'down', title: 'tot-hour-decrement', val: 68 },
  { id: 'separator' },
  { id: 'tot-min-dec', src: 'down', title: 'tot-min-decrement', val: 19 }
  ]
  constructor() {
    for (let h = 0; h < 24; h++) {
      this.hourList.push(h);
    }
    for (let m = 0; m < 60; m++) {
      this.minuteList.push(m);
    }
   }

  ngOnInit(): void {
  }

  setTime(idAttr: string) {
    console.log('event value is ', idAttr)
     // this.onTimeIncDec()
  }
  // onTimeIncDec
  // onTimeIncDec = (timeComponent, timeOperation) => {
  //   let timeElements = [];
  //   if (timeComponent.includes('hour')) {
  //     timeElements = this.hourList;
  //     return this.getIncDecHM(timeComponent, timeElements, timeOperation)
  //   } else {
  //     timeElements = this.minuteList;
  //     return this.getIncDecHM(timeComponent, timeElements, timeOperation)
  //   }
  // }


}
