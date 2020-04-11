import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emmen-won-dsv',
  templateUrl: './emmen-won-dsv.component.html',
  styleUrls: ['./emmen-won-dsv.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  @media screen and (max-width: 1200px)  {
      .modal-lg {
          width: 100% !important;
          max-width: calc(100%);
      }
      `]
})
export class EmmenWonDsvComponent {
  // getFromServer:Date=new Date();

  startTime: string;
  endTime: string;
  planDate: Date = new Date();
  today:string;
  closeResult: string;
  HMTime = 0;
  HourList = [];
  MinList = [];
  vanhours: string;
  vanminutes: string;
  tothours: string;
  totminutes: string;

  constructor(private modalService: NgbModal) {
    var dd = this.planDate.getDate();
    var mm = this.planDate.getMonth() + 1;
    var yyyy = this.planDate.getFullYear();
    this.today = dd+'-'+mm+'-'+yyyy;
    this.startTime = this.planDate.toLocaleTimeString().slice(0, 5);
    this.endTime = this.planDate.toLocaleTimeString().slice(0, 5);
    this.vanhours=this.startTime.slice(0,2);
    this.vanminutes=this.startTime.slice(3,5)
    this.tothours=this.endTime.slice(0,2);
    this.totminutes=this.endTime.slice(3,5)
    this.planDate.getDate();
    for (let h = 0; h < 23; h++) {
      this.HourList.push(h);
    }

    for (let m = 0; m < 60; m++) {
      this.MinList.push(m);
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setTime(event: Event) {
    var str = (<HTMLInputElement>event.target).id
    var expression = str.slice(0, 7);
    switch (expression) {
      case 'van-inc':
        console.log(this.TimeIncrementDecrement(str, "inc"));
        break;
      case 'van-dec':
        console.log(this.TimeIncrementDecrement(str, "dec"));
        break;
      case 'tot-inc':
        console.log(this.TimeIncrementDecrement(str, "inc"));
        break;
      case 'tot-dec':
        console.log(this.TimeIncrementDecrement(str, "dec"));
        break;
      // include as many cases as you like
      default:
    }
  }

  TimeIncrementDecrement = (TimeComponent, TimeOperation) => {
    let TimeElements = [];
    if (TimeComponent.includes('hour')) {
      TimeElements = this.HourList;
      return this.getIncDecHM("hour", TimeElements, TimeOperation)
    }
    else {
      TimeElements = this.MinList;
      return this.getIncDecHM("min", TimeElements, TimeOperation)
    }
  }

  getIncDecHM = (timeComponent, TimeElements, TimeOperation) => {
    let HourMin = 0;
    let HMTime;
    let currentPos;
    if (timeComponent === 'hour') {
      currentPos = TimeElements.indexOf(this.vanhours);
    }
    if (timeComponent === 'min') {
      currentPos = TimeElements.indexOf(this.vanminutes);
    }
    let newPos = 0;
    switch (TimeOperation) {
      case 'inc':
        if (currentPos !== (TimeElements.length - 1)) {
          newPos = currentPos + 1;
          console.log("new Increment value is ",newPos)
        }
        return TimeElements[newPos];
      case 'dec':
        if (currentPos === 0) {
          newPos = TimeElements.length - 1;
          console.log("new Decerment value is ",newPos)
        }
        else {
          newPos = currentPos - 1;
          console.log("new dec else value is ",newPos)
        }
        return TimeElements[newPos];
      default:
        return HourMin;
    }
  }
}
