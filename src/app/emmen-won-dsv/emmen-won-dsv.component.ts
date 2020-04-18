import { Component, Input } from '@angular/core';
import { AppointmentService, Appointment } from '../appointment.service';
import { ModalPlanComponent } from '../modal-plan/modal-plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-emmen-won-dsv',
  templateUrl: './emmen-won-dsv.component.html',
  styleUrls: ['./emmen-won-dsv.component.css']
})
export class EmmenWonDsvComponent {
  @Input() appointment: Appointment[];
  moment=moment;

  constructor(private modalService: NgbModal, private appService: AppointmentService) {
  }
  ngOnInit():void {
    this.getAppointments()
  }

  getAppointments(): void {
    this.appService.getAppointmentDetails().subscribe(appointment => {
      this.appointment = appointment;
    });
  }

  open(id: string):void {
    const modalRef = this.modalService.open(ModalPlanComponent, { size: 'xl',centered:true });
    modalRef.componentInstance.type = id;
  }
}
