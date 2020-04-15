import { Component, Input } from '@angular/core';
import { AppointmentService, Appointment } from '../appointment.service';
import { ModalPlanComponent } from '../modal-plan/modal-plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared-service';
import * as moment from 'moment';

@Component({
  selector: 'app-emmen-won-dsv',
  templateUrl: './emmen-won-dsv.component.html',
  styleUrls: ['./emmen-won-dsv.component.css']
})
export class EmmenWonDsvComponent {
  @Input() appointment: Appointment[];
  moment=moment;
  constructor(private modalService: NgbModal, private appService: AppointmentService, private sharedService: SharedService) {
    this.appService.getAppointmentDetails().subscribe(data => {
      this.appointment = this.sharedService.formateTime(data);
    });
  }

  ngOnInit() {
   
  }

  open(id: string) {
    const modalRef = this.modalService.open(ModalPlanComponent, { size: 'lg' });
    modalRef.componentInstance.type = id;
  }
}
