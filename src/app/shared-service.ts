import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Appointment } from './appointment.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  
  formateTime(formateValue:Appointment[]) {
    formateValue.forEach(element => {
      let planDate= moment.utc(element.startTime).local().format("DD-MM-YYYY");
      let startTime= moment.utc(element.startTime).local().format("hh:mm");
      let endTime= moment.utc(element.startTime).local().format("hh:mm");
      let dateProperty={
        planDate:planDate,
        startTime:startTime,
        endTime:endTime
      }
       element['dateProperty']=dateProperty;
    });
   return formateValue;
  }
}