import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  datePicker: FormGroup;
  today = new Date();
 
 
  constructor(private formBuilder: FormBuilder ) {
    
  }

  ngOnInit(): void {
    this.datePicker =  new FormGroup({
      appointmentDate:new FormControl(moment().format('DD-MM-YYYY'),Validators.required)
    });
  }
  
}
