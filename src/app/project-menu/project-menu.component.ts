import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPlanComponent } from '../modal-plan/modal-plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  goPlanning() {
    this.router.navigate(['/', 'emmen']);
  }

  open(type: string) {
    const modalRef = this.modalService.open(ModalPlanComponent, { size: 'xl' })
    modalRef.componentInstance.type = type;
  }

}
