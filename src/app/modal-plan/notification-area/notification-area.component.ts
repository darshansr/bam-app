import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.css']
})
export class NotificationAreaComponent implements OnInit {
  @Input() parentForm=FormGroup;
  noteForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
   
  }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      phoneOne:new FormControl('', Validators.required),
      phoneTwo:new FormControl(''),
      notificationOne: new FormControl(true,Validators.required),
      notificationTwo: new FormControl(false)
    });
  }


}
