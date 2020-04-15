import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { v1 as uuidv1 } from 'uuid';
import * as moment from 'moment';
import { SharedService } from '../shared-service';

@Component({
  templateUrl: './modal-plan.component.html',
  styles: []
})
export class ModalPlanComponent {

  @Input() type: string;

  appointmentDate: NgbDateStruct;
  startTime: string;
  endTime: string;
  planDate: Date = new Date();
  today: string;
  closeResult: string;
  hourList = [];
  minuteList = [];
  appform: FormGroup;

  formBind: {};
  modalData: any;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private formBuilder: FormBuilder, private appService: AppointmentService, private sharedService: SharedService) {
    for (let h = 0; h < 24; h++) {
      this.hourList.push(h);
    }
    for (let m = 0; m < 60; m++) {
      this.minuteList.push(m);
    }
  }

  ngOnInit(): void {
    this.appform = this.formBuilder.group({
      id: [''],
      appointmentDate: [],
      vanHH: [moment().format('hh'), Validators.required],
      vanMM: [moment().format('mm'), Validators.required],
      totHH: [moment().format('hh'), Validators.required],
      totMM: [moment().format('mm'), Validators.required],
      phoneOne: [''],
      phoneTwo: [''],
      notificationOne: [true],
      notificationTwo: [true]
    });

    if (this.type !== 'create') {
      console.log('cchecking conditon ', this.type)
      this.appService.getAppointmentDetailById(this.type).subscribe(data => {
        this.modalData = this.sharedService.formateTime([data])[0];
        this.appform.patchValue(this.createFormData(this.modalData))
      });
    }
  }

  createFormData(data) {
    let check = moment(data.dateProperty.planDate, 'DD-MM-YYYY');
    let startTime = moment(data.dateProperty.startTime, 'hh:mm');
    let endTime = moment(data.dateProperty.startTime, 'hh:mm');

    let mm = parseInt(check.format('M'));
    let dd = parseInt(check.format('D'));
    let yyyy = parseInt(check.format('YYYY'));
    let vanHH = parseInt(startTime.format('hh'));
    let vanMM = parseInt(startTime.format('mm'));
    let totHH = parseInt(endTime.format('hh'));
    let totMM = parseInt(endTime.format('mm'));

    this.appointmentDate = {
      year: yyyy,
      month: mm,
      day: dd
    }

    return this.formBind = {
      id: data.id,
      appointmentDate: this.appointmentDate,
      vanHH: vanHH,
      vanMM: vanMM,
      totHH: totHH,
      totMM: totMM,
      phoneOne: data.phoneOne,
      phoneTwo: data.phoneTwo,
      notificationOne: data.notificationOne,
      notificationTwo: data.notificationTwo
    }
  }

  setTime(event: Event) {
    let str = (<HTMLInputElement>event.target).id
    switch (str) {
      case 'van-hour-inc':
        this.timeIncDec(str, "inc");
        break;
      case 'van-hour-dec':
        this.timeIncDec(str, "dec");
        break;
      case 'van-min-dec':
        this.timeIncDec(str, "dec");
        break;
      case 'van-min-inc':
        this.timeIncDec(str, "inc");
        break;
      case 'tot-hour-inc':
        this.timeIncDec(str, "inc");
        break;
      case 'tot-min-inc':
        this.timeIncDec(str, "inc");
        break;
      case 'tot-hour-dec':
        this.timeIncDec(str, "dec");
        break;
      case 'tot-min-dec':
        this.timeIncDec(str, "dec");
        break;
      default:
    }
  }

  timeIncDec = (timeComponent, timeOperation) => {
    let timeElements = [];
    if (timeComponent.includes('hour')) {
      timeElements = this.hourList;
      return this.getIncDecHM(timeComponent, timeElements, timeOperation)
    } else {
      timeElements = this.minuteList;
      return this.getIncDecHM(timeComponent, timeElements, timeOperation)
    }
  }

  getIncDecHM = (timeComponent, timeElements, timeOperation) => {
    let id = timeComponent.substring(0, timeComponent.length - 4);
    let formcontrolname = document.getElementById(id).getAttribute('formcontrolname');
    let HourMin = parseInt(this.appform.get(formcontrolname).value);
    let currentPos = timeElements.indexOf(HourMin);
    let newPos = 0;
    switch (timeOperation) {
      case 'inc':
        if (currentPos !== (timeElements.length - 1)) {
          console.log(currentPos);
          newPos = currentPos + 1;
        }
        this.appform.patchValue({
          [formcontrolname]: newPos
        });
        this.appform.get(formcontrolname).value
        if (formcontrolname === 'vanHH' || formcontrolname === 'totHH') {
          this.hourValidate(formcontrolname)
        }
        return timeElements[newPos];

      case 'dec':
        if (currentPos === 0) {
          newPos = timeElements.length - 1;
        } else {
          newPos = currentPos - 1;
        }
        this.appform.patchValue({
          [formcontrolname]: newPos
        });
        this.appform.get(formcontrolname).value
        if (formcontrolname === 'vanHH' || formcontrolname === 'totHH') {
          this.hourValidate(formcontrolname)
        }
        return timeElements[newPos];

      default:
        return;
    }
  }

  hourValidate(formcontrolname) {
    let hour = {
      vanHH: Number,
      totHH: Number
    }
    if (formcontrolname === "vanHH") {
      hour.totHH = this.appform.get("totHH").value;
      hour.vanHH = this.appform.get(formcontrolname).value;
    } else {
      hour.vanHH = this.appform.get("vanHH").value;
      hour.totHH = this.appform.get(formcontrolname).value;
    }
    if (hour.vanHH > hour.totHH) {
      console.log('endTime must be greater than startTime ')
      return true;
    }
  }

  onSubmit(data) {
    if (this.type === "create") {
      let startTime = data.appointmentDate.day + "-" + data.appointmentDate.month + "-" + data.appointmentDate.year + " " + data.vanHH + ":" + data.vanMM
      let endTime = data.appointmentDate.day + "-" + data.appointmentDate.month + "-" + data.appointmentDate.year + " " + data.totHH + ":" + data.totMM
      let start = moment(startTime, 'DD-MM-YYYY hh:mm');
      let end = moment(endTime, 'DD-MM-YYYY hh:mm');
      let finalObject = {
        id: uuidv1(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        phoneOne: data.phoneOne,
        phoneTwo: data.phoneTwo,
        notificationOne: data.notificationOne,
        notificationTwo: data.notificationTwo
      }
      this.appService.createAppointment(finalObject);
      alert("Created object is " + JSON.stringify(finalObject))
      this.activeModal.close();
    } else {
      console.log("updated object", data)
      let startTime = data.appointmentDate.day + "-" + data.appointmentDate.month + "-" + data.appointmentDate.year + " " + data.vanHH + ":" + data.vanMM
      let endTime = data.appointmentDate.day + "-" + data.appointmentDate.month + "-" + data.appointmentDate.year + " " + data.totHH + ":" + data.totMM
      let start = moment(startTime, 'DD-MM-YYYY hh:mm');
      let end = moment(endTime, 'DD-MM-YYYY hh:mm');
      let updatedObject = {
        id: data.id,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        phoneOne: data.phoneOne,
        phoneTwo: data.phoneTwo,
        notificationOne: data.notificationOne,
        notificationTwo: data.notificationTwo
      }

      alert("updated object is " + JSON.stringify(updatedObject))
      this.activeModal.close();
    }
  }


}