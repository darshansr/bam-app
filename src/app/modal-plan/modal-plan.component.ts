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

    if (this.type !== 'create') {
      this.appService.getAppointmentDetailById(this.type).subscribe(data => {
        this.appform.patchValue(this.createFormData(data))
      });
    }
  }

  ngAfterViewInit() {
    this.appform.addControl('notificationForm', this.notificationComponent.noteForm);
    this.appform.addControl('datePicker',this.datePickerComponent.datePicker);
    this.notificationComponent.noteForm.setParent(this.appform);
    this.datePickerComponent.datePicker.setParent(this.appform)
    this.cd.detectChanges();
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
      id: data.id,
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