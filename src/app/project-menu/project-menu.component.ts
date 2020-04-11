import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goPlanning() {
    this.router.navigate(['/', 'emmen']);
  }
}
