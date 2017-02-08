import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models/employee.model';

@Injectable()
export class DataRepository {
  constructor(private http: Http) {
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.fields || { };  // return empty object if body.fields is null or undefined
  }

  private extractLanguages(response: Response) {
    let body = response.json();
    return body.data || { };
  }

  private handleError(error: any) {
    console.log('Error ocurred during post: ', error);
    return Observable.throw(error.statusText);
  }

  postEmpployeeForm(employee: Employee): Observable<any> {
    let body = JSON.stringify(employee);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:4000/postemployee', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getLanuages(): Observable<any> {
    return this.http.get('http://localhost:4000/getlanguages')
      .delay(2000)  // delay for 2 sec
      .map(this.extractLanguages)
      .catch(this.handleError); 
  }
}