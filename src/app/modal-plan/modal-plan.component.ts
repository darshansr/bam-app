import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppointmentService, Appointment } from '../appointment.service';
import { v1 as uuidv1 } from 'uuid';
import * as moment from 'moment';
import { MomentPipe } from '../moment-pipe';
import { Router,RouterModule  } from '@angular/router';

@Component({
  templateUrl: './modal-plan.component.html',
  styles: []
})
export class ModalPlanComponent {

  @Input() type: string;

  hourList = [];
  minuteList = [];
  appform: FormGroup;
  formBind: {};
  modalData: any;
  today =new Date();
  constructor(private router: Router,public activeModal: NgbActiveModal, private modalService: NgbModal,private formBuilder: FormBuilder, private appService: AppointmentService, private momentService: MomentPipe) {
    for (let h = 0; h < 24; h++) {
      this.hourList.push(h);
    }
    for (let m = 0; m < 60; m++) {
      this.minuteList.push(m);
    }
  
  }

  ngOnInit(): void {
    this.appform = this.formBuilder.group({
      _id: [''],
      appointmentDate: [moment().format('DD-MM-YYYY'),Validators.required],
      vanHH: [moment().format('HH'), Validators.required],
      vanMM: [moment().format('mm'), Validators.required],
      totHH: [moment().format('HH'), Validators.required],
      totMM: [moment().format('mm'), Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      notificationOne: [true,Validators.required],
      notificationTwo: [false]
    });

    if (this.type !== 'create') {
      this.appService.getAppointmentDetailById(this.type).subscribe(data => {
        console.log('value of id',data)
        this.appform.patchValue(this.createFormData(data))
      });
    }
   
  }

  createFormData=(data)=> {
    let appointmentDate=this.momentService.transform(data.startTime,'DD-MM-YYYY')
    let startTime = this.momentService.transform(data.startTime,'HH:mm')
    let endTime = this.momentService.transform(data.endTime,'HH:mm')

    let vanHH = startTime.split(':')[0];
    let vanMM = startTime.split(':')[1]
    let totHH = endTime.split(':')[0];
    let totMM = endTime.split(':')[1];

    return this.formBind = {
      _id: data._id,
      appointmentDate: appointmentDate,
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

  setTime=(event: Event) =>{
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
    let hourMin = parseInt(this.appform.get(formcontrolname).value);
    let currentPos = timeElements.indexOf(hourMin);
    let newPos = 0;
    switch (timeOperation) {
      case 'inc':
        if (currentPos !== (timeElements.length - 1)) {
          console.log(currentPos);
          newPos = currentPos + 1;
        }
        this.appform.patchValue({
          [formcontrolname]: ('0'+ newPos).slice(-2)
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
          [formcontrolname]: ('0'+ newPos).slice(-2)
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

  hourValidate=(formcontrolname)=> {
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

  onSubmit=(data:Appointment) =>{
    if (this.type === "create") {
      let finalObject = {
        _id: uuidv1(),
        startTime: this.momentService.formateStartEndTime(data).start.toISOString(),
        endTime: this.momentService.formateStartEndTime(data).end.toISOString(),
        phoneOne: data.phoneOne,
        phoneTwo: data.phoneTwo,
        notificationOne: data.notificationOne,
        notificationTwo: data.notificationTwo
      }
      this.appService.createAppointment(finalObject);
      this.appService.getAppointmentDetails();
      this.router.navigate(['/', 'emmen']);
      this.activeModal.close();
    } else {
      console.log("updated object", data)
      let updatedObject = {
        _id: data._id,
        startTime: this.momentService.formateStartEndTime(data).start.toISOString(),
        endTime: this.momentService.formateStartEndTime(data).end.toISOString(),
        phoneOne: data.phoneOne,
        phoneTwo: data.phoneTwo,
        notificationOne: data.notificationOne,
        notificationTwo: data.notificationTwo
      }
      this.activeModal.close();
     
     this.appService.updateAppointmentById(updatedObject._id,updatedObject)
    }
  }
}