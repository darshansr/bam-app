import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
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
    baseurl = "https://fierce-earth-17956.herokuapp.com/appointment";

    data: Appointment[];

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json'
        })
    }

    // Error handling
    errorHandl(error) {
        console.log(error);
        let errorMessage = 'nor found';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    // POST 
     createAppointment(data:Appointment):void {
        this.http.post<Appointment>(this.baseurl,data, this.httpOptions)
        .subscribe({
            next: data =>data,
            error: error => console.error('There was an error!', error)
        })
    }

    // GET
    getAppointmentDetailById(_id:string): Observable<Appointment> {
        return this.http.get<Appointment>(this.baseurl + '/' + _id)
            .pipe(
                map(data => {
                    return data;
                  }), catchError( error => {
                    return throwError( 'No Appoinement for this time',error );
                  })
            )
    }

    // GET All
    getAppointmentDetails(): Observable<Appointment[]> {
       return this.http.get<Appointment[]>(this.baseurl)
       .pipe(
            map(data => {
                return data;
              }), catchError( error => {
                return throwError( 'No Appoinement for this time',error );
              })
        )     
    }

    // Patch
    updateAppointmentById(_id, data): Observable<Appointment> {
        console.log(_id,data)
        return this.http.patch<Appointment>(this.baseurl +'/'+_id, data, this.httpOptions)
            .pipe(
                map(data => {
                    console.log(data)
                    return data;
                  }), catchError( error => {
                    return throwError( 'No Appoinement for this time',error );
                  })
            )
    }

}