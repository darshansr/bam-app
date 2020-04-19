import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppointmentService, Appointment } from '../appointment.service';
import { v1 as uuidv1 } from 'uuid';
import * as moment from 'moment';
import { MomentPipe } from '../moment-pipe';
import { Router } from '@angular/router';

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
  dirtyValues = {};
  modalData: any;
  today = new Date();
  constructor(private router: Router, public activeModal: NgbActiveModal, private modalService: NgbModal, private formBuilder: FormBuilder, private appService: AppointmentService, private momentService: MomentPipe) {
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
      appointmentDate: [moment().format('DD-MM-YYYY'), Validators.required],
      vanHH: [moment().format('HH'), Validators.required],
      vanMM: [moment().format('mm'), Validators.required],
      totHH: [moment().add(1, 'h').format('HH'), Validators.required],
      totMM: [moment().format('mm'), Validators.required],
      phoneOne: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)]],
      phoneTwo: [''],
      notificationOne: [true, Validators.required],
      notificationTwo: [false]
    });

    this.appform.valueChanges.subscribe(changes => {
      this.appform.get('vanHH').setValidators(lessThan(this.appform.value.totHH));
      this.appform.get('totHH').setValidators(moreThan(this.appform.value.vanHH));
    });
    if (this.type !== 'create') {
      this.appService.getAppointmentDetailById(this.type).subscribe(data => {
        this.appform.patchValue(this.createFormData(data))
      });
    }

  }

  createFormData = (data) => {
    let appointmentDate = this.momentService.transform(data.startTime, 'DD-MM-YYYY')
    let startTime = this.momentService.transform(data.startTime, 'HH:mm')
    let endTime = this.momentService.transform(data.endTime, 'HH:mm')

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

  setTime = (event: Event) => {
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
          newPos = currentPos + 1;
        }
        //add inc/dec value to formcontrol name and make it dirty
        this.formControlDetails(formcontrolname, newPos);
        return timeElements[newPos];

      case 'dec':
        if (currentPos === 0) {
          this.appform.get('vanHH').markAsDirty();
          newPos = timeElements.length - 1;
          //add inc/dec value to formcontrol name and make it dirty
          this.formControlDetails(formcontrolname, newPos);
        } else {
          newPos = currentPos - 1;
          this.formControlDetails(formcontrolname, newPos);
        }
        return timeElements[newPos];
      default:
        return;
    }
  }

  formControlDetails=(formName, newValue)=> {
    this.appform.get(formName).markAsDirty();
    this.appform.patchValue({
      [formName]: ('0' + newValue).slice(-2)
    });
  }

  onSubmit = (data: Appointment) => {
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
      let dirtyValue = this.getDirtyValues(this.appform)
      let updatedObject = {
        startTime: this.momentService.formateStartEndTime(dirtyValue).start.toISOString(),
        endTime: this.momentService.formateStartEndTime(dirtyValue).end.toISOString(),
        phoneOne: dirtyValue['phoneOne'],
        phoneTwo: dirtyValue['phoneTwo'],
        notificationOne: dirtyValue['notificationOne'],
        notificationTwo: dirtyValue['notificationTwo']
      }

      Object.keys(updatedObject).forEach(key => {
        //use key and value here
        let value = updatedObject[key];
        if (value === undefined || value === null) {
          delete updatedObject[key];
          return updatedObject;
        }
      });
      this.activeModal.close();
      this.appService.updateAppointmentById(data._id, updatedObject)
    }
  }

  //return object which is driety in the form
  getDirtyValues = (form: any) => {
    console.log("form value is ", form);
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls)
            this.dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            this.dirtyValues[key] = currentControl.value;
        }
      });
    return this.dirtyValues;
  }
}

export function lessThan(end: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = control.value > end
    return forbidden ? { 'lessThan': { value: control.value } } : null;
  };
}

export function moreThan(end: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = control.value < end
    return forbidden ? { 'moreThan': { value: control.value } } : null
  };
}
