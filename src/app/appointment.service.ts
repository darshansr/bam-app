import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



export interface Appointment {
    _id: string,
    startTime: string,
    endTime: string,
    phoneOne: string,
    phoneTwo: string,
    notificationOne: boolean,
    notificationTwo: boolean
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    baseurl = "https://fierce-earth-17956.herokuapp.com/appointment/";

    data: Appointment[];

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json'
        })
    }
    // POST 
    createAppointment(data: Appointment): void {
        this.http.post<Appointment>(this.baseurl, data, this.httpOptions)
            .subscribe({
                next: data => data,
                error: error => console.error('There was an error!', error)
            })
    }

    // GET
    getAppointmentDetailById(_id: string): Observable<Appointment> {
        return this.http.get<Appointment>(this.baseurl+_id)
            .pipe(
                map(data => {
                    return data;
                }), catchError(error => {
                    return throwError('No Appoinement for this time', error);
                })
            )
    }

    // GET All
    getAppointmentDetails(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.baseurl)
            .pipe(
                map(data => {
                    return data;
                }), catchError(error => {
                    return throwError('No Appoinement for this time', error);
                })
            )
    }

    // Patch
    updateAppointmentById(_id, data): void {
        console.log(typeof data)
          this.http.patch<Appointment>(this.baseurl+_id,data, this.httpOptions)
            .subscribe({
                next: data => console.log('updateddata',data),
                error: error => console.error('There was an error!', error)
            })
    }

}