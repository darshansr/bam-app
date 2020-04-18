import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {
  @Input()  inputBox;
  timeForm: FormGroup;
  constructor(private formBuilder: FormBuilder ) {
    
  }

  ngOnInit(): void {
    this.timeForm = new FormGroup({
      vanHH:new FormControl(moment().format('HH'), Validators.required),
      vanMM:new FormControl(moment().format('mm'), Validators.required),
      totHH:new FormControl(moment().format('HH'), Validators.required),
      totMM:new FormControl(moment().format('mm'), Validators.required),
    });
    
  }
  
}
