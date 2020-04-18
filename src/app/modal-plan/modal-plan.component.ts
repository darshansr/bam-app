import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { v1 as uuidv1 } from 'uuid';
import { MomentPipe } from '../moment-pipe';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { InputBoxComponent } from './start-end-time/input-box/input-box.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@Component({
  templateUrl: './modal-plan.component.html',
  styles: []
})
export class ModalPlanComponent {

  @Input() type: string;
  @ViewChild(NotificationAreaComponent) notificationComponent: NotificationAreaComponent;
  @ViewChild(InputBoxComponent) inputBoxComponent: InputBoxComponent;
  @ViewChild(DatePickerComponent) datePickerComponent: DatePickerComponent;

  hourList = [];
  minuteList = [];
  appform: FormGroup;
  formBind: {};
  modalData: any;
  today =new Date();
  constructor(private cd: ChangeDetectorRef,public activeModal: NgbActiveModal, private modalService: NgbModal,private formBuilder: FormBuilder, private appService: AppointmentService, private momentService: MomentPipe) {
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
    });
  
    // this.notificationComponent.appform.setParent(this.appform);
    // this.datePickerComponent.appform.setParent(this.appform)
    // this.inputBoxComponent.appform.setParent(this.appform)

    if (this.type !== 'create') {
      this.appService.getAppointmentDetailById(this.type).subscribe(data => {
       // this.appform.patchValue(this.createFormData(data))
      });
    }
  }

  ngAfterViewInit() {
    this.appform.addControl('notificationForm', this.notificationComponent.noteForm);
  
    this.appform.addControl('datePicker',this.datePickerComponent.datePicker);
   // this.appform.addControl('inputBox',this.inputBoxComponent.timeForm);
    this.notificationComponent.noteForm.setParent(this.appform);
    this.datePickerComponent.datePicker.setParent(this.appform)
    this.cd.detectChanges();
   // this.inputBoxComponent.timeForm.setParent(this.appform)
  }
  // dateValidator(format){
  //   console.log('format');
  //   return (control: FormControl): { [key: string]: any } => {
  //     const val = moment(control.value, format);
  //     if (!val.isValid()) {
  //       return { invalidDate: true };
  //     }
  //     return null;
  //   };
  // }

  createFormData=(data)=> {
    let appointmentDate=this.momentService.transform(data.startTime,'DD-MM-YYYY')
    let startTime = this.momentService.transform(data.startTime,'HH:mm')
    let endTime = this.momentService.transform(data.endTime,'HH:mm')

    let vanHH = startTime.split(':')[0];
    let vanMM = startTime.split(':')[1]
    let totHH = endTime.split(':')[0];
    let totMM = endTime.split(':')[1];
return;
    // return this.formBind = {
    //   id: data.id,
    //   appointmentDate: appointmentDate,
    //   vanHH: vanHH,
    //   vanMM: vanMM,
    //   totHH: totHH,
    //   totMM: totMM,
    //   phoneOne: data.phoneOne,
    //   phoneTwo: data.phoneTwo,
    //   notificationOne: data.notificationOne,
    //   notificationTwo: data.notificationTwo
    // }
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

  // hourValidate=(formcontrolname)=> {
  //   let hour = {
  //     vanHH: Number,
  //     totHH: Number
  //   }
  //   if (formcontrolname === "vanHH") {
  //     hour.totHH = this.appform.get("totHH").value;
  //     hour.vanHH = this.appform.get(formcontrolname).value;
  //   } else {
  //     hour.vanHH = this.appform.get("vanHH").value;
  //     hour.totHH = this.appform.get(formcontrolname).value;
  //   }
  //   if (hour.vanHH > hour.totHH) {
  //     console.log('endTime must be greater than startTime ')
  //     return true;
  //   }
  // }

  onSubmit=(data) =>{
    if (this.type === "create") {
      let finalObject = {
        id: uuidv1(),
        startTime: this.momentService.formateStartEndTime(data).start.toISOString(),
        endTime: this.momentService.formateStartEndTime(data).end.toISOString(),
        phoneOne: data.phoneOne,
        phoneTwo: data.phoneTwo,
        notificationOne: data.notificationOne,
        notificationTwo: data.notificationTwo
      }
      this.appService.createAppointment(finalObject);
      alert("final object "+JSON.stringify(this.appform.value));
      //alert("Created object is " + JSON.stringify(finalObject))
      this.activeModal.close();
    } else {
      console.log("updated object", data)
      let updatedObject = {
        id: data.id,
        startTime: this.momentService.formateStartEndTime(data).start.toISOString(),
        endTime: this.momentService.formateStartEndTime(data).end.toISOString(),
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