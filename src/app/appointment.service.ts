import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Appointment {
    id: string,
    startTime: string,
    endTime: string,
    phoneOne: string,
    phoneTwo: string,
    notificationOne: boolean,
    notificationTwo: boolean
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    baseurl = '';

    fakeData = [{
        id: "xyz",
        startTime: "2020-04-16T14:00:13.141Z",
        endTime: "2020-04-16T14:00:13.141Z",
        phoneOne: "1234",
        phoneTwo: "13423",
        notificationOne: true,
        notificationTwo: true
    },
    {
        id: "abc",
        startTime: "2020-04-13T14:00:13.141Z",
        endTime: "2020-04-13T14:00:13.141Z",
        phoneOne: "31289323",
        phoneTwo: "314213423",
        notificationOne: true,
        notificationTwo: true
    }
    ]

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    // POST Intial Appointment
    createAppointment(data): Observable<Appointment[]> {
        this.fakeData.push(data);

        return;
        // return this.http.post<Appointment>(this.baseurl + '/Appointmenttracking/', JSON.stringify(data), this.httpOptions)
        //     .pipe(
        //         retry(1),
        //         catchError(this.errorHandl)
        //     )
    }

    // GET
    getAppointmentDetailById(id): Observable<Appointment> {
        return of(this.fakeData.find(element => element.id === id))

        // return this.http.get<Appointment[]>(this.baseurl + '/Appointmenttracking/' + id)
        //     .pipe(
        //         retry(1),
        //         catchError(this.errorHandl)
        //     )
    }

    // GET All
    getAppointmentDetails(): Observable<Appointment[]> {
        return of(this.fakeData);
        // return this.http.get<Appointment>(this.baseurl + '/Appointmenttracking/')
        //     .pipe(
        //         retry(1),
        //         catchError(this.errorHandl)
        //     )
    }

    // Patch
    updateAppointmentById(id, data): Observable<Appointment[]> {
        return this.http.put<Appointment[]>(this.baseurl + '/Appointmenttracking/' + id, JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

}