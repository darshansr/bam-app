import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
    transform(date, format) {
        if (moment(date, moment.ISO_8601).isValid()) {
            let check = moment(date, moment.ISO_8601)
            return check.format(format)
        }
        else {
            let check = moment(date, format)
            return check.format(format);
        }
    }

    formateStartEndTime(data) {
        let startTime = this.transform(data.appointmentDate, 'DD-MM-YYYY') + " " + data.vanHH + ":" + data.vanMM
        let endTime = this.transform(data.appointmentDate, 'DD-MM-YYYY') + " " + data.totHH + ":" + data.totMM
        let start = moment(startTime, 'DD-MM-YYYY HH:mm');
        let end = moment(endTime, 'DD-MM-YYYY HH:mm');
        return { start, end }
    }
}