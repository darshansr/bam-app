import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-start-end-time',
  templateUrl: './start-end-time.component.html',
  styleUrls: ['./start-end-time.component.css']
})
export class StartEndTimeComponent implements OnInit {
  idAttr: string;
  hourList = [];
  minuteList = [];

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

  //TODO: event is not working because  of the ng-template
  setTime(idAttr: string) {
    console.log('event value is ', idAttr)
     // this.onTimeIncDec(timeComponent,timeOperation);
  }
  //TODO: create service for increment and decrement
  onTimeIncDec = (timeComponent, timeOperation) => {
    let timeElements = [];
    if (timeComponent.includes('hour')) {
      timeElements = this.hourList;
      return this.getIncDecHM(timeComponent, timeElements, timeOperation)
    } else {
      timeElements = this.minuteList;
      return this.getIncDecHM(timeComponent, timeElements, timeOperation)
    }
  }
  
  //TODO: create service for getIncrement or decrement value
  getIncDecHM = (timeComponent, timeElements, timeOperation) => {
    let id = timeComponent.substring(0, timeComponent.length - 4);
    let formcontrolname = document.getElementById(id).getAttribute('formcontrolname');
    let hourMin = 0;//parseInt(this.appform.get(formcontrolname).value);
    let currentPos = timeElements.indexOf(hourMin);
    let newPos = 0;
    switch (timeOperation) {
      case 'inc':
        if (currentPos !== (timeElements.length - 1)) {
          newPos = currentPos + 1;
        }
        return timeElements[newPos];

      case 'dec':
        if (currentPos === 0) {
          newPos = timeElements.length - 1;
        } else {
          newPos = currentPos - 1;
        }
        return timeElements[newPos];
      default:
        return;
    }
  }

}
